// ** React Import
import { useDispatch } from 'react-redux'
import { getNoteData } from '../store'

// ** Custom Components
import toast from 'react-hot-toast'
import Sidebar from '@components/sidebar'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'

// ** Utils
import axios from 'axios'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardBody, CardText, Input, Label,Button ,FormText,Form} from 'reactstrap'

// ** Reactstrap Imports
// import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions

const defaultValues = {
  note: '',
}

const NoteSidebar = ({ open, toggleSidebar }) => {
    const dispatch = useDispatch()

  

  // ** Store Vars
  

  // ** Vars
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    formState
  } = useForm({ defaultValues,mode: "onChange"  })

  // ** Function to handle form submit
  const onSubmit = async (data) => {
    
    try{
      const res = await axios.post('http://127.0.0.1:8000/sales-api/add-note',{
        detail:data.note
      },{
        headers:{
          Accept:'application/json',
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      console.log(res)
      toast(t => (
        <ToastDone position="top-right" t={t} msg={'تم إضافة الملاحظة بنجاح !!'} />
      ))
      dispatch(getNoteData())

    
    }catch(error){
  
      if (error.code == 'ERR_NETWORK')   toast(t => (
        <ToastError t={t} err={'مشكلة بالاتصال !!'} />
      ))
      if(error.code == 'ERR_BAD_REQUEST')   toast(t => (
        <ToastError t={t} err={'الرجاءإدخال ملاحظة !!'} />
      ))

    else console.log(error.code)
    
    }
    
    
  }



  return (
    <Sidebar
      size='sm'
      open={open}
      title=''
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      
    >
      <Form onSubmit={handleSubmit(onSubmit)}>

      <Card>
      <CardHeader>
        <CardTitle ><h2>إضافة ملاحظة</h2></CardTitle>
      </CardHeader>

      <CardBody>
        <CardText className='mb-3'>
          ادخل الملاحظة واضغط على إضافة...
        </CardText>
        <div className='form-floating mt-2'>
        <Controller
            name='note'
            id='note'
            rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
          <Input
            type='textarea'
            invalid={errors.note && true}
            placeholder='ملاحظة'
            style={{ minHeight: '100px' }}
            {...field}
          />)}
          />
          
          <Label className='form-label' for='floating-textarea'>
            ملاحظة
          </Label>
        </div>
      </CardBody>
    </Card>


                
              



        <Button disabled={!formState.isValid} type='submit' className='me-1' color='primary'>
          إضافة
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          إالغاء
        </Button>
      </Form>
    </Sidebar>
  )
}

export default NoteSidebar
