import Avatar from '@components/avatar'

import {ShoppingBag} from 'react-feather'


export const renderTransactions = (Arr) => {
    return Arr.map(item => {
      return (
        <div key={item.selling_port_id} className='transaction-item'>
          <div className='d-flex'>
            <Avatar className='rounded' color='primary' icon={<ShoppingBag size={18} />} />
            <div>
              <h5 className='transaction-title'>{item.selling_port.name}</h5>
              {/* <small>{item.subtitle}</small> */}
            </div>
          </div>
          <div className='text-success'><b>{item.total}</b></div>
        </div>
      )
    })
  }