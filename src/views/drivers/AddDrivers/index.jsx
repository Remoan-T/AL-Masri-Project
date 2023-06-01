// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText
} from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import axios from 'axios'
import toast from 'react-hot-toast'

// ** Icons Imports
import { User, Smartphone, Lock, MapPin } from 'react-feather'
const defaultValues = {
  mobile_number: '',
  address: '',
  name: ''
}

const VerticalFormIcons = () => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    formState
  } = useForm({ defaultValues ,mode: "onChange" })

  // ** Function to handle form submit
  const onSubmit = async (data) => {

    try {
      const res = await axios.post('http://127.0.0.1:8000/machenism-api/add-driver', {
        name: data.name,
        address: data.address,
        mobile_number: data.mobile_number
      }, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      if(!res.data.error) {toast(t => (
        <ToastDone position="top-right" t={t} msg={'تم إضافة السائق بنجاح !!'} />
      ))
     reset()
    }
      if (res.data.error && res.data.error == "The name has already been taken.") toast(t => (
        <ToastError t={t} err={'السائق موجود'} />
      ))

    } catch (error) {

      if (error.code == 'ERR_NETWORK') toast(t => (
        <ToastError t={t} err={'مشكلة بالإتصال بقاعدة البيانات !!'} />
      ))
      if (error.code == 'ERR_BAD_REQUEST' && error.response.data.errors.mobile_number) toast(t => (
        <ToastError t={t} err={error.response.data.errors.mobile_number} />
      ))

      console.log(error)

    }


  }





  return (
    <div className='mt-3'>
      <Card className='mx-5 px-2'>
        <CardHeader>
          <CardTitle tag='h4'>اضافة سائق</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='12'>
                <Label className='form-label' for='nameVerticalIcons'>
                  اسم السائق
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <User size={15} />
                  </InputGroupText>
                  <Controller
                    name='name'
                    id='name'
                    control={control}
                    rules={{ required:true}}
                    render={({ field }) => (
                      <Input type='text'
                        placeholder='اسم السائق'
                        invalid={errors.name && true}
                        maxLength={18}
                        minLength={3}
                        {...field}
                        required
                      />)}
                  />
                </InputGroup>
              </Col>

              <Col sm='12'>
                <Label className='form-label' for='IconsMobile'>
                  رقم الجوال
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <Smartphone size={15} />
                  </InputGroupText>
                  <Controller
                    name='mobile_number'
                    id='mobile_number'
                    rules={{ required:true}}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='number'
                        maxLength='12'
                        size='12'
                        placeholder='رقم الهاتف'
                        invalid={errors.mobile_number && true}
                        required
                        {...field}
                      />)}
                  />
                </InputGroup>
              </Col>
              <Col sm='12'>
                <Label className='form-label' for='IconsPassword'>
                  العنوان
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <MapPin size={15} />
                  </InputGroupText>
                  <Controller
                    name='address'
                    id='address'
                    control={control}
                    rules={{ required:true}}
                    render={({ field }) => (
                      <Input type='text'
                        placeholder='عنوان السكن'
                        required
                        maxLength={18}
                        minLength={3}
                        invalid={errors.address && true}
                        {...field}
                      />)}
                  />
                </InputGroup>

              </Col>





              <Col>

                <div className='d-flex justify-content-center'>
                  <Button disabled={!formState.isValid} className='btn-md w-75 ' color='primary' type='submit' >
                    إضافة سائق
                  </Button>
                </div>

              </Col>


            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
export default VerticalFormIcons



