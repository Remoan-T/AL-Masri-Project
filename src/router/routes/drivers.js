import { lazy } from 'react'

const AddDrivers = lazy(() => import('../../views/drivers/AddDrivers'))
const DisplayDeletedDrivers = lazy(() => import('../../views/drivers/DisplayDeletedDrivers'))
const DisplayDrivers = lazy(() => import('../../views/drivers/DisplayDrivers'))

const DriversRoutes = [
  {
    path: '/Drivers/AddDrivers',
    element: <AddDrivers />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  },
  {
    path: '/Drivers/AvailableDrivers',
    element: <DisplayDrivers />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  },
  {
    path: '/Drivers/DeletedDrivers',
    element: <DisplayDeletedDrivers />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  }
]

export default DriversRoutes