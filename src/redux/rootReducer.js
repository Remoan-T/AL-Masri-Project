// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import kanban from '@src/views/apps/kanban/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'
import farm from '../views/farms/store'
import statement from '../views/statements/store'
import warehouse from '../views/warehouse/store'

import selling from '../views/SellingPort/store'
import notes from '../views/notes/store'
import order from '../views/orders/store'
import truck from '../views/Trucks/store'
import trip from '../views/Trips/store'
import driver from '../views/drivers/store'
import slaughter from '@src/views/slaughter_supervisor/store'
import cutting from '@src/views/cuttingSupervisor/store'



const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  warehouse,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  farm,
  selling,
  notes,
  order,
  truck,
  trip,
  statement,
  driver,
  slaughter,
  cutting
}

export default rootReducer
