// ** React Import
import { useDispatch , useSelector} from 'react-redux'
import { getUsersData } from '../store'
import { getManagingLevels } from '../store'
import { useEffect } from 'react'

// ** Custom Components
import toast from 'react-hot-toast'
import Sidebar from '@components/sidebar'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import { selectThemeColors } from '@utils'
import { selectStyles } from '../../../assets/react-select/scrollbar.styles';
// import '@styles/react/libs/react-select/_react-select.scss'

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
  username:'',
  first_name:'',
  last_name:'',

}

const NoteSidebar = ({ open, toggleSidebar }) => {
    const dispatch = useDispatch()

    const store = useSelector((state) => state.ceo);


    useEffect(() => {
      dispatch(getManagingLevels());
    }, [dispatch, store.managingLevels.length]);  

  

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
    console.log(data)
    
    try{
      const res = await axios.post('http://127.0.0.1:8000/ceo-api/ceo/add-user',{
        managing_level:data.managing_level,
        first_name:data.first_name,
        last_name:data.last_name,
        username:data.username

      },{
        headers:{
          Accept:'application/json',
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      console.log(res.data)
      if(res.data.message)
      toast(t => (
        <ToastDone position="top-right" t={t} msg={res.data.message} />
      ))
      dispatch(getUsersData())

    
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
        <CardTitle ><h2>تبديل مستخدم</h2></CardTitle>
      </CardHeader>

      <CardBody>
        <CardText className='mb-3'>
          اختر الدور وادخل بيانات المستخدم الجديد...
        </CardText>

        <div className='form-floating mt-2 pt-1'>
   

                <Controller
                  name="managing_level"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={selectStyles}
                      onChange={(selectedOption) => onChange(selectedOption?.value || null)}
                      placeholder='اختر الدور'
                      theme={selectThemeColors}
                      classNamePrefix='select'
                      className='react-select'
                      isClearable
                      options={store.managingLevels.map((option) => {
                        let label;
                    
                        switch (option) {
                          case 'libra-commander':
                            label = <span className='user-status fs-5'>آمر القبان</span>;
                            break;
                          case 'Purchasing-and-Sales-manager':
                            label = <span className='user-status fs-5'>مدير المشتريات والمبيعات</span>;
                            break;
                          case 'Mechanism-Coordinator':
                            label = <span className='user-status fs-5'>منسق حركة الآليات</span>;
                            break;
                          case 'cutting_supervisor':
                            label = <span className='user-status fs-5'>مشرف قسم التقطيع</span>;
                            break;
                          case 'slaughter_supervisor':
                            label = <span className='user-status fs-5'>مشرف قسم الذبح</span>;
                            break;
                          case 'warehouse_supervisor':
                            label = <span className='user-status fs-5'>مشرف المخازن</span>;
                            break;
                          case 'Manufacturing_Supervisor':
                            label = <span className='user-status fs-5'>مشرف التصنيع</span>;
                            break;
                          case 'ceo':
                            label = <span className='user-status fs-5'>المدير التنفيذي</span>;
                            break;
                          case 'Production_Manager':
                            label = <span className='user-status fs-5'>مدير الإنتاج</span>;
                            break;
                          case 'Accounting-Manager':
                            label = <span className='user-status fs-5'>مدير الحسابات</span>;
                            break;
                          default:
                            label = <span className='user-status fs-5'>{option}</span>;
                        }
                    
                        return { value: option, label };
                      })}


                    />
                  )}

                  defaultValue=""
                />

        </div>


        <div className='form-floating mt-2 pt-1'>
        <Controller
            name='first_name'
            id='first_name'
            rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
          <Input
            type='text'
            invalid={errors.first_name && true}
            // placeholder='ملاحظة'
            {...field}
            maxLength={12}
          />)}
          />
          
          <Label className='form-label fs-5 pt-1' >
            الاسم الأول <span className='text-success'>(الجديد)</span>
          </Label>
        </div>
        <div className='form-floating mt-2 pt-1'>
        <Controller
            name='last_name'
            id='last_name'
            rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
          <Input
            type='text'
            invalid={errors.last_name && true}
            // placeholder='ملاحظة'
            {...field}
            maxLength={12}
          />)}
          />
          
          <Label className='form-label fs-5 pt-1' >
           الاسم الأخير <span className='text-success'>(الجديد)</span>
          </Label>
        </div>
        <div className='form-floating mt-2 pt-1'>
        <Controller
            name='username'
            id='username'
            rules={{ required:true}}
                  control={control}
                  render={({ field }) => (
          <Input
            type='text'
            invalid={errors.username && true}
            // placeholder='ملاحظة'
            {...field}
            maxLength={15}
          />)}
          />
          
          <Label className='form-label fs-5  pt-1' >
            اسم المستخدم <span className='text-success'>(الجديد)</span>
          </Label>
        </div>
      </CardBody>
    </Card>


                
              



        <Button disabled={!formState.isValid} type='submit' className='me-1' color='primary'>
          تبديل
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          إالغاء
        </Button>
      </Form>
    </Sidebar>
  )
}

export default NoteSidebar
