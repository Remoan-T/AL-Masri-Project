import {X ,AlertOctagon} from 'react-feather'
import Avatar from '@components/avatar'
import toast ,{ Toaster }from 'react-hot-toast'

const ToastError = ({ t, err }) => {

    return (
       
        <div className='d-flex' >

            <div className='me-1'>
                <Avatar size='sm' color='danger' icon={<AlertOctagon size={15} />} />
            </div>
            <div className='d-flex flex-column text-danger'>
                <div className='d-flex justify-content-between'>
                    <h4 className='text-danger'> <b>{err}</b> </h4>
                    <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
                </div>
         
            </div>
     
        </div>

    )
}

export default ToastError;