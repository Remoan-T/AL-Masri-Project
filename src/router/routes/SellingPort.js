import { lazy } from 'react'

const RegistrationRequestsSelling = lazy(() => import('../../views/SellingPort/RegistrationRequestsSelling'))
const SellingPortDeleted = lazy(() => import('../../views/SellingPort/SellingPortDeleted'))
const SellingPortRequests = lazy(() => import('../../views/SellingPort/SellingPortRequests'))
const SellingPortList = lazy(() => import('../../views/SellingPort/SellingPortShow'))

const SellingPortRoutes = [
  {
    path: '/SellingPort/RegistrationRequestsSelling',
    element: <RegistrationRequestsSelling />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  },
  {
    path: '/SellingPort/SellingPortRequests',
    element: <SellingPortRequests />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  },
  {
    path: '/SellingPort/SellingPortList',
    element: <SellingPortList />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  },
  {
    path: '/SellingPort/SellingPortDeleted',
    element: <SellingPortDeleted />,
    meta: {
      action: 'read',
      resource: 'ceo'
    }
  }
]

export default SellingPortRoutes
