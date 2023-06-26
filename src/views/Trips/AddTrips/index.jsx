import React, { useState, useEffect } from 'react';
// import Select from 'react-select/dist/declarations/src/Select';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Form, Label, Input, Button } from 'reactstrap'
import axios from 'axios'
import { getAvailableTrucks } from '../../Trucks/store'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select' // eslint-disable-line
import { getDriversData } from '../../drivers/store'
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import { selectThemeColors } from '@utils'
import { selectStyles } from '../../../assets/react-select/scrollbar.styles';
import { useParams } from 'react-router-dom'


//Styles
import '@styles/react/libs/react-select/_react-select.scss'

function DynamicFields() {

  const { id } = useParams()

  const [options, setOptions] = useState([]);
  const [optionsDrivare, setOptionsDrivare] = useState([]);

  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      selectTruck: '', selectDriver: ''

    },
    mode: "onChange"
  });
  const store = useSelector(state => state.truck)
  const store2 = useSelector(state => state.driver)

  useEffect(() => {

    dispatch(getDriversData())
    setOptionsDrivare(store2.data)
  }, [dispatch, store2.data.length])
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getAvailableTrucks())
    setOptions(store.AvailableTrucks);
  }, [dispatch, store.AvailableTrucks.length])



  const onSubmit = async (data) => {

    if (data.selectDriver.value && data.selectTruck.value) {
      try {
        const res = await axios.post(`http://127.0.0.1:8000/machenism-api/add-detail-trip/${id}`, {
          driver_id: data.selectDriver.value, truck_id: data.selectTruck.value
        }, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.accessToken}`
          }
        })
        if (res.data.status == false)
          toast(t => (
            <ToastError position="top-right" t={t} err={res.data.msg} />
          ))
        if (res.data.status == true)
          toast(t => (
            <ToastDone position="top-right" t={t} msg={res.data.message} />
          ))


      } catch (error) {
        if (error.code == 'ERR_NETWORK') toast(t => (
          <ToastError t={t} err={'  مشكلة بالاتصال بقاعدة البيانات !!'} />
        ))
        console.log(error)

      }


    }
    if (!data.selectDriver || !data.selectTruck.value)
      toast(t => (
        <ToastError position="top-right" t={t} err='الرجاء ملئ كامل البيانات !!' />
      ))

  }


  return (

    <div className='mt-4 pt-3'>
      <Card className='mx-5 px-2'>
        <CardBody>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='divider'>
              <div className='divider-text'><h2 className='text-primary'>إضافة رحلة</h2></div>

            </div>
            <Row className='justify-content-between align-items-center'>

              <Col md={4} className='mb-md-0 mb-1 mr-3'>
                <Label className='form-label' >
                  السائق
                </Label>

                <Controller
                  name="selectDriver"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={selectStyles}
                      onChange={onChange}
                      placeholder='اختر السائق'
                      theme={selectThemeColors}
                      classNamePrefix='select'
                      className='react-select'
                      isClearable
                      options={optionsDrivare.map((option) => ({ value: option.id, label: option.name }))}


                    />
                  )}

                  defaultValue=""
                />





              </Col>
              <Col md={4} className='mb-md-0 mb-1'>
                <Label className='form-label' >
                  الشاحنة
                </Label>
                <Controller
                  name="selectTruck"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      placeholder='اختر الشاحنة'
                      styles={selectStyles}
                      theme={selectThemeColors}
                      classNamePrefix='select'
                      className='react-select'
                      isClearable
                      options={options.map((option) => ({ value: option.id, label: option.name }))}


                    />
                  )}

                  defaultValue=""
                />


              </Col>


              <div className='d-flex justify-content-center pt-5'>
                <Button disabled={!formState.isValid} className='btn-md w-75 ' color='primary' type='submit' >
                  إضافة رحلة
                </Button>
              </div>


            </Row>
          </Form>

        </CardBody>
      </Card>
    </div>
  );
}

export default DynamicFields;

