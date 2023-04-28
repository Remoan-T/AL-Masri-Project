import { lazy } from 'react'

const AddOrder = lazy(() => import('../../views/orders/AddOrder'))
const DisplayAcceptableOrders = lazy(() => import('../../views/orders/DisplayAcceptableOrders'))
const DisplayUnacceptableOrder = lazy(() => import('../../views/orders/DisplayUnacceptableOrder'))
const DisplayOrder = lazy(() => import('../../views/orders/DisplayOrder'))

const OrderRoutes = [
    {
        path: '/order/OrderList',
        element: <DisplayOrder />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    },
    {
        path: '/order/AcceptableOrders',
        element: <DisplayAcceptableOrders />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    },
    {
        path: '/order/UnacceptableOrder',
        element: <DisplayUnacceptableOrder />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    },
    {
        path: '/order/AddOrder',
        element: <AddOrder />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    }
]

export default OrderRoutes
