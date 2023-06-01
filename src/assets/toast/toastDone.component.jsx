import {X ,CheckCircle} from 'react-feather'
import Avatar from '@components/avatar'
import toast from 'react-hot-toast'

const ToastDone = ({ t, msg }) => {

    return (
        <div className='d-flex' position="top-right">
            <div className='me-1'>
                <Avatar size='sm' color='success' icon={<CheckCircle size={15} />} />
            </div>
            <div className='d-flex flex-column text-success'>
                <div className='d-flex justify-content-between'>
                    <h4 className='text-success'> <b>{msg}</b> </h4>
                    <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
                </div>
                {/* sometext */}
            </div>
        </div>
    )
}

export default ToastDone;