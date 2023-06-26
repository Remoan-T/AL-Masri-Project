// ** React Imports
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from 'axios'
import { ReactComponent as Almasri } from '@src/assets/images/svg/almasri.svg';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'


// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X ,AlertOctagon} from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Importsx
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'


const ToastContent = ({ t, name, role }) => {

  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6> مرحباً <b>{name} </b> </h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span> تم تسجيل الدخول بنجاح </span>
      </div>
    </div>
  )
}



const ToastError = ({ t, errName }) => {

  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='danger' icon={<AlertOctagon size={10} />} />
      </div>
      <div className='d-flex flex-column text-danger'>
        <div className='d-flex justify-content-between'>
          {(errName =='ERR_NETWORK') &&<h4 className='text-danger'> <b>قاعدة البيانات غير متصلة !!</b> </h4>}
          {(errName =='LoginError') &&<h4 className='text-danger'><b>اسم المستخدم أو كلمة المرور خطأ !!</b></h4>}
          {(errName !='LoginError' && errName !='ERR_NETWORK' ) &&<h4 className='text-danger'><b>{errName}</b></h4>}
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
      {/* sometext */}
      </div>
    </div>
  )
}


const defaultValues = {
  // password: 'admin',
  // loginEmail: 'admin@demo.com'
  password: '',
  loginEmail: ''
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    formState
  } = useForm({ defaultValues,mode: "onChange" })
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
    

  const onSubmit = async data => {
    try {

      const res = await client.post('http://127.0.0.1:8000/api/login', {
        username: data.loginEmail, password: data.password
      })
      

// console.log(res)
       if(res.data.error){ toast(t => (
        <ToastError t={t}  errName={'LoginError'} />
      ))
    return null
    }

      if(res.data.message ) { toast(t => (
        <ToastError t={t}  errName={res.data.message} />
      ))
    return null
    }

  
      dispatch(handleLogin(res.data))
      res.data.username && toast(t => (
        <ToastContent t={t} role={res.data.managing_level || 'admin'} name={res.data.username || 'John Doe'} />
      ))
      // resetFormFields()
   
      const ab = JSON.parse(localStorage.getItem('ability'))
      ability.update(ab)
      navigate(getHomeRouteForLoggedInUser(res.data.managing_level))

      // {res.data.username && navigate('/')}
    } catch (error) {
      console.log(error.code)
      toast(t => (
        <ToastError t={t} errName={error.code} />
      ))
    }
  }

  return (
    <div className='auth-wrapper auth-cover' >
      <Row className='auth-inner m-0' >
        <Col className='d-none d-lg-flex align-items-center ' lg='8' sm='12' style={{paddingLeft: "0px" 
        , paddingRight: "0px", paddingTop: "0px" ,paddingBottom: "0px"}}>

          <div  style={{paddingLeft: "0px" , paddingRight: "0px", paddingTop: "0px"
          ,paddingBottom: "0px",height: '100%', width:'100%'
          , backgroundImage:`url(${source})` ,backgroundSize:'contain'
          , backgroundRepeat:"no-repeat",backgroundPosition: "center" ,backgroundColor:`${skin === 'dark' ? '#111427' : '#ffffff'}`}}>
         
          </div>
        </Col>
     

        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              <Almasri />
            </CardTitle>
            <Alert color='primary'>
              <div className='alert-body font-med-1'>
                <p >
                  المصري للدواجن الرجاء ادخال معلومات الحساب وتسجيل الدخول ...
                </p>
              </div>
            </Alert>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  اسم المستخدم
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  rules={{ required:true}}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    كلمة السر
                  </Label>
                  {/* <Link to='/forgot-password'>
                    <small>هل نسيت كلمة السر ؟</small>
                  </Link> */}
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  rules={{ required:true}}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <Button disabled={!formState.isValid} type='submit' color='primary' block>
                تسجيل الدخول
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
