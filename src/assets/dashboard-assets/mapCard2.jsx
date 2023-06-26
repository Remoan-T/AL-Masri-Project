import Avatar from '@components/avatar'

import {Home} from 'react-feather'


export const renderTransactions1 = (Arr) => {
    return Arr.map(item => {
      return (
        <div key={item.farm_id} className='transaction-item'>
          <div className='d-flex'>
            <Avatar className='rounded' color='warning' icon={<Home size={18} />} />
            <div>
              <h5 className='transaction-title'>{item.farm.name}</h5>
              {/* <small>{item.subtitle}</small> */}
            </div>
          </div>
          <div className='text-success'><b>{item.total}</b></div>
        </div>
      )
    })
  }