import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openDialog, closeDialog } from '../store'

import { useForm, Controller } from 'react-hook-form'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
    Row,
    Col,
    Card,
    Form,
    Modal,
    Badge,
    Label,
    Input,
    Button,
    CardBody,
    CardTitle,
    ModalBody,
    CardHeader,
    InputGroup,
    ModalHeader,
    FormFeedback,
    ModalFooter,
    InputGroupText
} from 'reactstrap'
const EditDialogComponent = (data) => {

    const isOpen = useSelector((state) => state.warehouse.isOpen);
    console.log("🚀 ~ file: EditDialog.jsx:7 ~ EditDialogComponent ~ store.isOpen:", isOpen)
    const dispatch = useDispatch();
    const defaultValues = {

        stockpile: '',
        minimum: '',

    }

    const {
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
        formState
    } = useForm({
        defaultValues,
        mode: "onChange"
    })

    const handleOpenDialog = () => {
        dispatch(openDialog());
    };

    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };
    const onSubmit = async (values) => {
        console.log("🚀 ~ file: EditDialog.jsx:63 ~ onSubmit ~ data:", values)

        try {
            const res = await axios.post(`http://127.0.0.1:8000/warehouse-supervisor-api/edit-warehouse-row-info/1`, {
                stockpile: values.stockpile,
                minimum: values.minimum,

            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.accessToken}`
                }
            })
            toast(t => (
                <ToastDone position="top-right" t={t} msg={'تم إضافة الحمولة !!'} />
            ))

            //reset()

        } catch (error) {

            if (error.code == 'ERR_NETWORK') toast(t => (
                <ToastError t={t} err={'مشكلة بالاتصال !!'} />
            ))
            if (error.code == 'ERR_BAD_REQUEST') toast(t => (
                <ToastError t={t} err={'الرجاؤ إدخال مركبة'} />
            ))

            console.log(error)

        }


    }

    return (
        <div>


            <Modal
                isOpen={isOpen}
                toggle={() => handleCloseDialog()}
                className="modal-dialog-centered"
                size="lg"
            >
                <Form>
                    <ModalHeader toggle={() => handleCloseDialog()}>
                        تعديل الوزن
                    </ModalHeader>
                    <ModalBody>

                        <Form onSubmit={handleSubmit(onSubmit)} >
                            <Row>
                                <Col sm='12'>
                                    <Label className='form-label' for='IconsMobile'>
                                        المخزون الاحتياطي                </Label>
                                    <InputGroup className='input-group-merge mb-1'>
                                        <Controller
                                            name='stockpile'
                                            control={control}
                                            rules={{
                                                required: true,
                                                min: {
                                                    value: 1,
                                                    message: 'السعة غير صحيحة'
                                                },
                                                maxLength: {
                                                    value: 5,
                                                    message: 'تأكد من السعة'
                                                }
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    type='number'
                                                    id='stockpile'
                                                    placeholder='ادخل الحد الادنى'
                                                    required
                                                    {...field}
                                                />)}
                                        />
                                    </InputGroup>
                                    {errors.storage_capacity && <p className='text-danger'> {errors.storage_capacity.message} </p>}
                                </Col>

                                <Col sm='12'>
                                    <Label className='form-label' for='IconsPassword'>
                                        الحد الادنى
                                    </Label>
                                    <InputGroup className='input-group-merge mb-1'>
                                        <Controller
                                            name='minimum'
                                            rules={{ required: true }}
                                            control={control}
                                            render={({ field }) => (
                                                <Input type='text'
                                                    placeholder='وزن الاحتياطي '
                                                    required
                                                    maxLength={10}
                                                    minLength={3}
                                                    id='minimum'
                                                    {...field}
                                                />)}
                                        />
                                    </InputGroup>
                                </Col>


                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit'>
                            إرسال الطلب
                        </Button>

                    </ModalFooter>
                </Form>
            </Modal>

        </div>
    );
}

export default EditDialogComponent;