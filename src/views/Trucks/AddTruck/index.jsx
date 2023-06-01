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
  import { Truck, FileText, Package ,Map,Hash} from 'react-feather'
  const defaultValues = {

    name:'',
    governorate_name:'',
    truck_number:'',
    storage_capacity:'',
    model:'',
  }
  
  
  const VerticalFormIcons = () => {
    const {
      control,
      setValue,
      handleSubmit,
      reset,
      formState: { errors },
      formState
    } = useForm({ defaultValues,
      mode: "onChange" })
    
      // ** Function to handle form submit
      const onSubmit = async (data) => {
        
        try{
          const res = await axios.post('http://127.0.0.1:8000/machenism-api/add-trucks',{
            name: data.name, 
            model: data.model,
            storage_capacity: data.storage_capacity,
            truck_number: data.truck_number,
            governorate_name: data.governorate_name
          },{
            headers:{
              Accept:'application/json',
              Authorization: `Bearer ${localStorage.accessToken}`
            }
          })
          toast(t => (
            <ToastDone position="top-right" t={t} msg={'تم إضافة المركبة بنجاح !!'} />
          ))
          
      reset()
        
        }catch(error){
      
          if (error.code == 'ERR_NETWORK')   toast(t => (
            <ToastError t={t} err={'مشكلة بالاتصال !!'} />
          ))
          if(error.code == 'ERR_BAD_REQUEST')   toast(t => (
            <ToastError t={t} err={'الرجاؤ إدخال مركبة'} />
          ))
    
         console.log(error)
        
        }
        
        
      }

    
    return (
    <div >
      <Card className='mx-5 px-2'> 
        <CardHeader>
          <CardTitle tag='h4'>إضافة شاحنة</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='12'>
                <Label className='form-label' for='nameVerticalIcons'>
          اسم المركبة
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <Truck size={15} />
                  </InputGroupText>
                  <Controller
                  name='name'
                  control={control}
                  rules={{ required:true}}
                  render={({ field }) => (
                    <>
                  <Input type='text' 
                   placeholder='اسم المركبة'
                   id='name'
                   maxLength={12}
                   {...field}
  
                   required
                   />
                 
                   </>
                   )}

                  />

                </InputGroup>
              </Col>

              <Col sm='12'>
                <Label className='form-label' for='IconsMobile'>
                  اصدار الشاحنة
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <FileText size={15} />
                  </InputGroupText>
                  <Controller
                  name='model'
                    id='model'
                    rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
                  <Input 
                   type='text'
                   placeholder='نوع الشاحنة'
                   invalid={errors.model && true}
                   required
                   maxLength={12}
                  
                   {...field}
                   />)}
                  />
                </InputGroup>
              </Col>
              <Col sm='12'>
                <Label className='form-label' for='IconsMobile'>
                  السعة                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <Package size={15} />
                  </InputGroupText>
                  <Controller
                  name='storage_capacity'
                  control={control}
                  rules={{ 
                    required:true,
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
                   id='storage_capacity'
                   placeholder='سعة الشاحنة بال كغ'
                   required
                   {...field}
                   />)}
                  />
                </InputGroup>
                {errors.storage_capacity && <p className='text-danger'> {errors.storage_capacity.message} </p>}
              </Col>
              <Col sm='12'>
                <Label className='form-label' for='IconsMobile'>
                  رقم الشاحنة
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <Hash size={15} />
                  </InputGroupText>
                  <Controller
                  name='truck_number'
                  control={control}
                  rules={{ 
                     required:true,
                    min: {
                    value: 1,
                    message: 'رقم اللوحة غير صحيح'
                    },
                    maxLength: {
                      value: 6,
                      message: 'رقم اللوحة مؤلف من 6 أرقام'
                    },
                    minLength: {
                      value: 6,
                      message: 'رقم اللوحة مؤلف من 6 أرقام'
                    }
                  }}
                  render={({ field }) => (
                    <>
                  <Input 
                   type='number'
                   placeholder='رقم الشاحنة'
                   id='truck_number'
                   required
                   {...field}
                   />
                   </>)}
                  />
                </InputGroup>
                {errors.truck_number && <p className='text-danger'> {errors.truck_number.message} </p>}
              </Col>
              <Col sm='12'>
                <Label className='form-label' for='IconsPassword'>
                  المحافظة
                </Label>
                <InputGroup className='input-group-merge mb-1'>
                  <InputGroupText>
                    <Map size={15} />
                  </InputGroupText>
                  <Controller
                  name='governorate_name'
                  rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
                  <Input type='text' 
                   placeholder='المحافظة'
                   required
                   maxLength={10}
                   minLength={3}
                   id='governorate_name'
                   {...field}
                   />)}
                  />
                </InputGroup>
              </Col>

              <Col>
               
              <div className='d-flex justify-content-center'>
                  <Button disabled={!formState.isValid} className='btn-md w-75 ' color='primary' type='submit' >
                   إضافة الشاحنة
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
  


  