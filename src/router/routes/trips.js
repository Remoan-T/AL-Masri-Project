import { lazy } from 'react'

const AddTrips = lazy(() => import('../../views/Trips/AddTrips'))
const AvailableTrips = lazy(() => import('../../views/Trips/DisplayTrips'))
const DisplayOrderPurches = lazy(() => import('../../views/Trips/DisplayOrderPurches'))

const TripsRoutes = [
  {
    path: '/trips/AddTrips/:id',
    element: <AddTrips />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  },
  {
    path: '/trips/AvailableTrips',
    element: <AvailableTrips />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  },
  {
    path: '/trips/DisplayOrderPurches',
    element: <DisplayOrderPurches />,
    meta: {
      action: 'read',
      resource: 'mc'
    }
  }
]

export default TripsRoutes