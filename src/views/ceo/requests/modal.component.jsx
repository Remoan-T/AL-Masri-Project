import toast from "react-hot-toast";
import ToastDone from "@src/assets/toast/toastDone.component";
import ToastError from "@src/assets/toast/toastError.component";
import axios from "axios";
import { getRequests } from "../store";
import { Check ,X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";


import {
  Label,
  Input,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Badge
} from "reactstrap";

export const renderModalCell = (row) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();



  const handleModalSubmit = async (data) => {
  

    try {

    const res = await axios.post(`http://127.0.0.1:8000/ceo-api/ceo/refuse-request/${row.id}`,{
      reason_refuse_by_ceo:data.reason_refuse_by_ceo,

    },{
      headers:{
        Accept:'application/json',
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })

   
      // console.log(res.data);

      if (res.data.status == false)
        toast((t) => <ToastError t={t} err={res.data.msg} />);
      if (res.data.status == true)
        toast((t) => <ToastDone t={t} msg={res.data.message}  />);

    } catch (error) {
      if (error.code == "ERR_NETWORK")
        toast((t) => (
          <ToastError t={t} err={"مشكلة بالإتصال بقاعدة البيانات !!"} />
        ));

      console.error(error);
    }
    
    dispatch(getRequests());
    setFormModal(!formModal)
  };
  const [formModal, setFormModal] = useState(false)
  return (
      <div>
        {/* <Button color='primary' outline onClick={() => setFormModal(!formModal)}>
        س
        </Button> */}
        <Badge className='cursor-pointer' onClick={() => setFormModal(!formModal)} color="danger">
        <X size={10}  />
  &nbsp;رفض  
          </Badge>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setFormModal(!formModal)}> ادخل سبب الرفض</ModalHeader>
    <Form onSubmit={handleSubmit(handleModalSubmit)}>
          <ModalBody>
          <div className='form-floating mt-2'>
        <Controller
            name='reason_refuse_by_ceo'
            id='reason_refuse_by_ceo'
            rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
          <Input
            type='textarea'
            invalid={errors.reason_refuse_by_ceo && true}
            placeholder='سبب الرفض'
            style={{ minHeight: '100px' }}
            {...field}
          />)}
          />
          
          <Label className='form-label' for='floating-textarea'>
            سبب الرفض
          </Label>
        </div>
       
          </ModalBody>
          <ModalFooter>
            <Button disabled={!formState.isValid} color='primary' type='submit'>
              رفض الطلب
            </Button>{' '}
          </ModalFooter>
          </Form>
        </Modal>
      </div>
  );
};
