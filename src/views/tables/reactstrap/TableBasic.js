// ** Custom Components
import AvatarGroup from '@components/avatar-group'
import { useEffect } from 'react'

// ** Images
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'

// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { getFarmData } from '../../apps/farms/store'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { object } from 'prop-types'

const avatarGroupData1 = [
  {
    title: 'Lilian',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Alberto',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Bruce',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Diana',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Rey',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'James',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Lee',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Mario',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Oswald',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Christie',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Barnes',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Arthur',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const TableBasic = () => {

  const store = useSelector(state => state.farm)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFarmData())
  }, [dispatch, store.data.length])
  
  
  console.log(store)

return(
  store.data.map(fm =>
    <Table key={fm.id} responsive>
      <thead>
        <tr>
      
          <th>id</th>
          <th>Created At</th>
          <th>total Amount</th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          {fm.id}
          </td>
          <td>
            {fm.created_at}
          </td>
          <td>
            {fm.total_amount}
          </td>

        </tr>
      
      
        
      </tbody>
    </Table>
  ))
}

export default TableBasic
