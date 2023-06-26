import toast from "react-hot-toast";
import ToastDone from "@src/assets/toast/toastDone.component";
import ToastError from "@src/assets/toast/toastError.component";
import { getOfferFarms } from "../store";
import axios from "axios";
import { Check } from "react-feather";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

import {
  Row,
  Label,
  Input,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Col,
} from "reactstrap";

export const renderModalCell = (row, index) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    formState,
  } = useForm({ mode: "onChange" });

  const store = useSelector((state) => state.farm);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormModal(Array(store.OfferFarms.length).fill(false));
  }, [store.OfferFarms]);

  const orders = row.detailpurchase_orders;

  // const [checkboxValues, setCheckboxValues] = useState(
  //   orders.map((order) => order.type)
  // );

  const [checkboxValues, setCheckboxValues] = useState(
    orders.map((order) => "")
  );

  const [isInvalid, setIsInvalid] = useState(false);

  const [formModal, setFormModal] = useState(false);
  const [numberInputValue, setNumberInputValue] = useState(
    Array(orders.length).fill(0)
  );

  const handleCheckboxChange = (e, orderIndex) => {
    const updatedValues = [...checkboxValues];
    updatedValues[orderIndex] = e.target.checked ? orders[orderIndex].type : "";
    setCheckboxValues(updatedValues);

    //   if (e.target.checked) {
    //     console.log(orders[orderIndex].type);
    //   }
  };

  const handleNumberInputChange = (e, orderIndex) => {
    e.target.value.toString().includes("-") ||
    e.target.value.toString().startsWith("-") ||
    e.target.value.toString().length >= 5
      ? setIsInvalid(true)
      : setIsInvalid(false);
    const updatedValues = [...numberInputValue];
    updatedValues[orderIndex] = e.target.value;
    setNumberInputValue(updatedValues);
  };

  const handleModalToggle = (index) => {
    const updatedFormModal = [...formModal];
    updatedFormModal[index] = !updatedFormModal[index];
    setFormModal(updatedFormModal);
  };

  const handleModalSubmit = async (index, purchase_offers_id) => {
    const orders = store.OfferFarms[index].detailpurchase_orders;

    const selectedOrders = orders.filter(
      (order, orderIndex) =>
        checkboxValues[orderIndex] === order.type &&
        numberInputValue[orderIndex] > 0
    );

    const requestData = {
      details: selectedOrders.map((order, orderIndex) => ({
        type: order.type,
        amount: numberInputValue[orderIndex],
      })),
    };

    try {
      // Make the axios POST request
      // console.log(requestData.details)
      if (requestData.details.length == 0)
      {
     toast((t) => (
        <ToastError t={t} err={"الرجاء ملئ كامل البيانات بشكل صحيح !!"} />
      ));
    
    return null}
      const response = await axios.post(
        `http://127.0.0.1:8000/sales-api/confirm_offer/${purchase_offers_id}`,
        requestData
      );

      // Handle the response as per your requirements
      console.log(response.data);

      if (response.data.status == false)
        toast((t) => <ToastError t={t} err={response.data.msg} />);
      if (response.data.status == true)
        toast((t) => <ToastDone t={t} msg={response.data.message}  />);

      // Show success toast
    } catch (error) {
      if (error.code == "ERR_NETWORK")
        toast((t) => (
          <ToastError t={t} err={"مشكلة بالإتصال بقاعدة البيانات !!"} />
        ));

      console.error(error);
    }
    dispatch(getOfferFarms());
    handleModalToggle(index);
  };

  return (
    <div>
      <button
        onClick={() => handleModalToggle(index)}
        className="btn btn-success btn-sm"
      >
        <Check size={16} color="white" />
      </button>
      <Modal
        isOpen={formModal[index]}
        toggle={() => handleModalToggle(index)}
        className="modal-dialog-centered"
        size="lg"
      >
        <Form>
          <ModalHeader toggle={() => handleModalToggle(index)}>
            طلب من العرض
          </ModalHeader>
          <ModalBody>
            {orders.map((order, orderIndex) => {
              return (
                <Fragment key={orderIndex}>
                  <Row>
                    <Col md={6}>
                      <FormGroup check className="py-1">
                        <Label check>
                          <Input
                            type="checkbox"
                            checked={checkboxValues[orderIndex] === order.type}
                            onChange={(e) =>
                              handleCheckboxChange(e, orderIndex)
                            }
                          />
                          {order.type}
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-0">
                        <Label className="form-label">الكمية</Label>
                        <Controller
                          name={`details.amount`}
                          control={control}
                          // defaultValue={field.weight}
                          render={({ field }) => (
                            <Input
                              disabled={!checkboxValues[orderIndex]}
                              type="number"
                              placeholder="الكمية بال كغ"
                              {...field}
                              id={`details.${orderIndex}.amount`}
                              onChange={(e) =>
                                handleNumberInputChange(e, orderIndex)
                              }
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Fragment>
              );
            })}
          </ModalBody>
        </Form>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleModalSubmit(index, row.id)}
            disabled={numberInputValue == 0 || isInvalid == true }
          >
            إرسال الطلب
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};
