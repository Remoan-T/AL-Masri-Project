import { lazy } from 'react'

const AddTruck = lazy(() => import('../../views/Trucks/AddTruck'))
const AvailableTrucks = lazy(() => import('../../views/Trucks/DisplayAvailableTruck'))
const DeletedTrucks = lazy(() => import('../../views/Trucks/DisplayDeletedTruck'))

const TrucksRoutes = [
  {
    path: '/trucks/AddTruck',
    element: <AddTruck />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  },
  {
    path: '/trucks/DeletedTrucks',
    element: <DeletedTrucks />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  },
  {
    path: '/trucks/AvailableTrucks',
    element: <AvailableTrucks />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  }
]

export default TrucksRoutes
