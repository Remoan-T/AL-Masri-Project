// ** Logo
import logo from '@src/assets/images/logo/logo.png'
import { useSkin } from '@hooks/useSkin'

const SpinnerComponent = () => {
  const { skin } = useSkin()
  return (
    <div className='fallback-spinner app-loader' style={{backgroundColor:`${skin === 'dark' ? '#161d31' : ''}`}}>
      <img className='fallback-logo' src={logo} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
