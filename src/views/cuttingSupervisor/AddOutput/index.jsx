import axios from "axios";
import { getOutputCuttingTypes } from '../store'
import { useDispatch, useSelector } from "react-redux";
import { useParams  ,Link} from 'react-router-dom'
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
    const { id } = useParams()

  const {  handleSubmit, control,formState } = useForm({
    defaultValues: {
      details: [{ weight: "", type_id: "" }],
    },
    mode: "onChange"

    
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const [selectedOption, setSelectedOption] = useState(null);


  const store = useSelector((state) => state.cutting);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOutputCuttingTypes());
    console.log(store.outputTypes)
  }, [dispatch, store.outputTypes.length]);



  const onSubmit = async (data) => { 
  try {
      const res = await axios.post(
        `http://127.0.0.1:8000/cutting-supervisor-api/add-output-cutting/${id}`,
        {
          details: data.details,
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
    } catch (error) {
      console.log(error);
    }

 

  };

  return (
    <div className="pt-4">
      <Card className="mx-5 px-2">
        <CardBody >
          <Form onSubmit={handleSubmit(onSubmit)}>


            <div className="divider">
              <div className="divider-text">
                <b className="text-primary h1">
                إضافة خرج
                </b>
              </div>
            </div>
           

            {
              fields.map((field, index) => (
                

                <Row key={index} className="justify-content-between align-items-center pt-1">
           
                  <Col md={4} className="mb-md-0 mb-1">
                    <Label className="form-label">النوع</Label>

                    <Controller
                      name={`details.${index}.type_id`}
                      control={control}
                      rules={{ required:true}}
                      defaultValue={field.type_id}
                      id={`details.${index}.type_id`}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          styles={selectStyles}
                          placeholder="اختر النوع"
                          {...field}
                          theme={selectThemeColors}
                          classNamePrefix="select"
                          className="react-select"
                          isClearable
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
                          value={store.outputTypes.find((option) => option.value === value)}
                          options={store.outputTypes.map((option) => ({
                            value: option.id,
                            label: option.type,
                          }))}
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="mb-md-0 mb-1">
                    <Label className="form-label">الكمية</Label>
                    <Controller
                      name={`details.${index}.weight`}
                      control={control}
                      rules={{ required:true}}
                      defaultValue={field.weight}
                      render={({ field  }) => (
                        <Input
                          type="number"
                          placeholder="الكمية بال كغ"
                          {...field}
                    
                          id={`details.${index}.weight`}
                  

                          
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
                      style={{display: `${index == 0 ? 'none': ''}`}}
                    >
                      <X size={14} className="me-50" />
                      <span>حذف الطلب</span>
                    </Button>
                  </Col>
                </Row>
              ))}
   
        
            <Button
              className="btn-icon ml-5 mt-2"
              color="primary"
              type="button"
              onClick={() => append({ weight: "", type_id: "" })}
            >
              <Plus size={14} />
              <span className="align-middle ms-25">طلب جديد</span>
            </Button>
            <div className="d-flex justify-content-center pt-5">
              <Button disabled={!formState.isValid } className="btn-md w-25 " color="primary" type="submit">
                إرسال
              </Button>
            </div>

          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default DynamicFields;
