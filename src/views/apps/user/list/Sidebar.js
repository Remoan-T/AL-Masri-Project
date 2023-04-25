// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'
import axios from 'axios'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import TextareaFloatingLabel from '../../../forms/form-elements/textarea/TextareaFloatingLabel'
import { Card, CardHeader, CardTitle, CardBody, CardText, Input, Label,Button ,FormText,Form} from 'reactstrap'

// ** Reactstrap Imports
// import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null
}

const countryOptions = [
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Korea', value: 'Korea' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Russia', value: 'Russia' },
  { label: 'South', value: 'South' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' }
]

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')
  

  // ** Store Vars
  

  // ** Vars
  const {
    control,
    setValue,

    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

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
    
    }catch(error){
      console.log(error)
    
    }
    
    
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>

      <Card>
      <CardHeader>
        <CardTitle ><h2>إضافة ملاحظة</h2></CardTitle>
      </CardHeader>

      <CardBody>
        <CardText className='mb-3'>
          ادخل الملاحظة واضغط على إدخال...
        </CardText>
        <div className='form-floating mt-2'>
        <Controller
            name='note'
            id='note'
                  control={control}
                  render={({ field }) => (
          <Input
            type='textarea'
            invalid={errors.loginEmail && true}
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


                
              



        <Button type='submit' className='me-1' color='primary'>
          إضافة
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          إالغاء
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
