import { lazy } from 'react'

const UsersRoute = lazy(() => import('@src/views/ceo/users'))
const ShowRequests = lazy(() => import('@src/views/ceo/requests'))
// const DisplayDrivers = lazy(() => import('../../views/drivers/DisplayDrivers'))

const CEORoutes = [
  {
    path: '/Users/ShowUsers',
    element: <UsersRoute />,
    meta: {
      action: 'read',
      resource: 'CEO'
    }
  },
  {
    path: '/Requests/ShowRequests',
    element: <ShowRequests />,
    meta: {
      action: 'read',
      resource: 'CEO'
    }
  },
//   {
//     path: '/Drivers/DeletedDrivers',
//     element: <DisplayDeletedDrivers />,
//     meta: {
//       action: 'read',
//       resource: 'mc'
//     }
//   }
]

export default CEORoutes