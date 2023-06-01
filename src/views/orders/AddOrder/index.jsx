import { getAvailableFarms } from "../../farms/store";
import axios from "axios";

import { getSellingPort } from "../../SellingPort/store";
import { getProducts, getRowMaterials } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import { customNoOptionsMessage } from "../../../assets/react-select/react-selectMod";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { X, Plus } from "react-feather";
import { selectStyles } from "../../../assets/react-select/scrollbar.styles";

import { selectThemeColors } from "@utils";

//Styles
import "@styles/react/libs/react-select/_react-select.scss";

function DynamicFields() {

    


  const {  handleSubmit, control } = useForm({
    defaultValues: {
      selling_port_id: "",
      details: [{ amount: "", type: "" }],
    }
    
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [Farms, setFarms] = useState([]);
  const [Port, setPort] = useState([]);
  const [buy, setbuy] = useState([]);
  const [Sale, setSale] = useState([]);
  const [isRequest, setisRequest] = useState(1);

  const [selectedOption, setSelectedOption] = useState(null);


  const store = useSelector((state) => state.farm);
  const store2 = useSelector((state) => state.selling);
  const store3 = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvailableFarms());
    setFarms(store.AvailableFarms);
  }, [dispatch, store.AvailableFarms.length]);

  useEffect(() => {
    dispatch(getSellingPort());
    setPort(store2.SellingPort);
  }, [dispatch, store2.SellingPort.length]);
  useEffect(() => {
    dispatch(getRowMaterials());
    setbuy(store3.buyMaterials);
  }, [dispatch, store3.buyMaterials.length]);
  useEffect(() => {
    dispatch(getProducts());
    setSale(store3.Products);
    console.log(Sale);
  }, [dispatch, store3.Products.length]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setisRequest(isRequest === 0 ? 1 : 0)
  
  };

  const onSubmit = async (data) => { data.details.map(async (el)=> {
     for (let el of data.details) {
        if (el.amount < 0 || el.amount.toString().length > 5 ) {
        toast(t => {
            return <ToastError t={t} err={'يرجى التأكد من الكمية المدخلة !!'} />;
          });
          return;
        }
      }


  if(data.selling_port_id.value && data.details != '' && el.amount > 0 && el.amount.toString().length <= 5){try {
      const res = await axios.post(
        "http://127.0.0.1:8000/sales-api/add-requset-sales-purchasing",
        {
          request_type: isRequest,
          selling_port_id: (isRequest == 1 ? data.selling_port_id.value : null),
          details: data.details,
          farm_id : (isRequest == 0 ? data.selling_port_id.value : null)
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      
      if(!res.data.errNum)
      toast(t => (
        <ToastDone position="top-right" t={t} msg={res.data.message} />
      ))

      console.log(res);
      console.log(el.amount.toString().length)
    } catch (error) {
        if (error.code == 'ERR_NETWORK') toast(t => (
            <ToastError t={t} err={'  مشكلة بالاتصال بقاعدة البيانات !!'} />
          ))
        if (error.code == 'ERR_BAD_REQUEST' && error.response.data.message == 'The given data was invalid.') toast(t => (
            <ToastError t={t} err={'الرجاء ملئ كامل البيانات بشكل صحيح !!'} />
          ))
      console.log(error);
    }

}



})

    if(!data.selling_port_id || data.details == '' )toast(t => (
        <ToastError t={t} err={'الرجاء ملئ كامل بيانات الطلب بشكل صحيح'} />
      ))
 

  };

  return (
    <div>
      <Card className="mx-5 px-2">
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-center h4 ">
              انقر للتبديل بين طلب المبيع والشراء
            </div>
            <div className="form-check form-switch d-flex justify-content-center pt-1">
              {/* <Label for='exampleCustomSwitch' className='form-check-label'>    
                    </Label> */}

              <Input
                className="w-25 "
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
                // checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="divider">
              <div className="divider-text">
                <b className="text-primary h1">
                  {isChecked ? "طلب شراء" : "طلب مبيع"}
                </b>
              </div>
            </div>
            {isChecked && (
              <Row>
                <div className="d-flex justify-content-center">
                  <Col className="mb-1 " md="6">
                    <Label className="form-label"> المزرعة</Label>

                    <Controller
                      name="selling_port_id"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          styles={selectStyles}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          placeholder="اختر المزرعة"
                          {...field}
                          theme={selectThemeColors}
                          classNamePrefix="select"
                          className="react-select"
                          isClearable
                          noOptionsMessage={customNoOptionsMessage}
                          required
                          options={Farms.map((option) => ({
                            value: option.id,
                            label: option.name,
                          }))}
                        />
                      )}
                    />
                  </Col>
                </div>
              </Row>
            )}

            {isChecked &&
              fields.map((field, index) => (
                

                <Row key={index} className="justify-content-between align-items-center">
                  <Col md={4} className="mb-md-0 mb-1">
                    <Label className="form-label">الكمية</Label>
                    <Controller
                      name={`details.${index}.amount`}
                      control={control}
                      defaultValue={field.amount}
                      required
                      render={({ field  }) => (
                        <Input
                          required
                          type="number"
                          placeholder="الكمية بال كغ"
                          {...field}
                    
                          id={`details.${index}.amount`}
                  

                          
                        />
  
            
                      )}
                      
                    />


                  </Col>
                  <Col md={4} className="mb-md-0 mb-1">
                    <Label className="form-label">النوع</Label>

                    <Controller
                      name={`details.${index}.type`}
                      control={control}
                      defaultValue={field.type}
                      id={`details.${index}.type`}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          styles={selectStyles}
                          placeholder="اختر النوع"
                          {...field}
                          theme={selectThemeColors}
                          classNamePrefix="select"
                          className="react-select"
                          isClearable
                          required
                          noOptionsMessage={customNoOptionsMessage}
                          onChange={(selectedOption) => {
                            if (
                              selectedOption === null ||
                              selectedOption === undefined
                            ) {
                              onChange(null);
                            } else {
                              onChange(selectedOption.value);
                            }
                          }}
                          value={buy.find((option) => option.value === value)}
                          options={buy.map((option) => ({
                            value: option.name,
                            label: option.name,
                          }))}
                        />
                      )}
                    />
                  </Col>

                  <Col md={2} className="mt-2">
                    <Button
                      color="danger"
                      className="text-nowrap px-1"
                      type="button"
                      onClick={() => remove(index)}
                      outline
                    >
                      <X size={14} className="me-50" />
                      <span>حذف الطلب</span>
                    </Button>
                  </Col>
                </Row>
              ))}
            {/* for sales port order.............................. */}
            {!isChecked && (
              <Row>
                {/* <div className='justify-content-between align-items-center'> */}
                <div className="d-flex justify-content-center">
                  <Col className="mb-1" md="6">
                    <Label className="form-label">نقطة البيع</Label>

                    <Controller
                      name="selling_port_id"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          styles={selectStyles}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          placeholder="اختر المنفذ"
                          {...field}
                          theme={selectThemeColors}
                          classNamePrefix="select"
                          className="react-select"
                          isClearable
                          required
                          noOptionsMessage={customNoOptionsMessage}
                          options={Port.map((option) => ({
                            value: option.id,
                            label: option.name,
                          }))}
                        />
                      )}
                    />
                  </Col>
                </div>
              </Row>
            )}
            {!isChecked &&
              fields.map((field, index) => (
                <div key={field.id}>
                  <Row className="justify-content-between align-items-center">
                    <Col md={4} className="mb-md-0 mb-1">
                      <Label className="form-label">الكمية</Label>
                      <Controller
                        name={`details.${index}.amount`}
                        control={control}
                        defaultValue={field.amount}
                        render={({ field}) => (
                          <Input
                          required
                          type="number"   
                          placeholder="الكمية بال كغ"                    
                            {...field}
                            id={`details.${index}.amount`}
                          />
                        )}
                      />
                    </Col>
                    <Col md={4} className="mb-md-0 mb-1">
                      <Label className="form-label">النوع</Label>

                      <Controller
                        name={`details.${index}.type`}
                        control={control}
                        defaultValue={field.type}
                        id={`details.${index}.type`}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            styles={selectStyles}
                            placeholder="اختر النوع"
                            {...field}
                            theme={selectThemeColors}
                            classNamePrefix="select"
                            className="react-select"
                            isClearable
                            required
                            noOptionsMessage={customNoOptionsMessage}
                            onChange={(selectedOption) => {
                              if (
                                selectedOption === null ||
                                selectedOption === undefined
                              ) {
                                onChange(null);
                              } else {
                                onChange(selectedOption.value);
                              }
                            }}
                            value={buy.find((option) => option.value === value)}
                            options={Sale.map((option) => ({
                              value: option.name,
                              label: option.name,
                            }))}
                          />
                        )}
                      />
                    </Col>
                    <Col md={2} className="mt-2">
                      <Button
                        color="danger"
                        className="text-nowrap px-1"
                        type="button"
                        onClick={() => remove(index)}
                        outline
                      >
                        <X size={14} className="me-50" />
                        <span>حذف الطلب</span>
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            <Button
              className="btn-icon ml-5 mt-2"
              color="primary"
              type="button"
              onClick={() => append({ amount: "", type: "" })}
            >
              <Plus size={14} />
              <span className="align-middle ms-25">طلب جديد</span>
            </Button>
            <div className="d-flex justify-content-center pt-5">
              <Button className="btn-md w-25 " color="primary" type="submit">
                إرسال
              </Button>
            </div>

            {/* <Input type="submit" className="mx-3 my-3" /> */}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default DynamicFields;
