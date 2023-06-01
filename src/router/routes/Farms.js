import { lazy } from 'react'

const FarmsAvailable = lazy(() => import('../../views/farms/FarmsAvailable'))
const FarmsDeleted = lazy(() => import('../../views/farms/FarmsDeleted'))
const FarmsOffers = lazy(() => import('../../views/farms/FarmsOffers'))
const FarmsList = lazy(() => import('../../views/farms/registration requests'))

const FarmsRoutes = [
  {
    path: '/farms/FarmsList',
    element: <FarmsList />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  },
  {
    path: '/farms/FarmsOffers',
    element: <FarmsOffers />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  },
  {
    path: '/farms/FarmsAvailable',
    element: <FarmsAvailable />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  },
  {
    path: '/farms/FarmsDeleted',
    element: <FarmsDeleted />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  }
]

export default FarmsRoutes
