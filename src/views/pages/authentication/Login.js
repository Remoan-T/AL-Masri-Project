// ** React Imports
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from 'axios'
import { ReactComponent as Almasri } from '@src/assets/images/svg/almasri.svg';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

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
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span> تم تسجيل الدخول بنجاح ك {role} </span>
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
    formState: { errors }
  } = useForm({ defaultValues })
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = async data => {
    try {

      const res = await client.post('http://127.0.0.1:8000/api/login', {
        username: data.loginEmail, password: data.password
      })
      // console.log(res.data.token)
      console.log(res);
      // console.log(res.data.token);
      dispatch(handleLogin(res.data))
      // resetFormFields()
      //  localStorage.setItem("token", res.data.user.token)
      // Store the ability array in localStorage
      const ability1 = [
        {
          action: 'manage',
          subject: 'ceo'
        }
      ]
localStorage.setItem('ability2', JSON.stringify(ability1));

// Retrieve the ability array from localStorage when the page is refreshed
const storedAbilities = localStorage.getItem('ability2');
console.log("🚀 ~ file: Login.js:100 ~ onSubmit ~ storedAbilities:", storedAbilities)
// if (storedAbilities) {
//   abilities = JSON.parse(storedAbilities);
// }
      
      ability.update(ability1)
      navigate(getHomeRouteForLoggedInUser(res.data.managing_level))

      // {res.data.username && navigate('/')}
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
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
                  <Link to='/forgot-password'>
                    <small>هل نسيت كلمة السر ؟</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block>
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
