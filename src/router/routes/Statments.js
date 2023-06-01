import { lazy } from 'react'

const AddReceiptStatement = lazy(() => import('../../views/statements/AddReceiptStatement'))
const AddShipmentWeight = lazy(() => import('../../views/statements/AddShipmentWeight'))
const DisplaySpecificStatement = lazy(() => import('../../views/statements/DisplaySpecificStatement'))
const DisplayStatements = lazy(() => import('../../views/statements/DisplayStatements'))
const InvoicePreview = lazy(() => import('@src/views/statements/preview'))
const DisplayTrips = lazy(() => import('../../views/statements/DisplayTrips'))

const StatmentRoutes = [
    {
        path: '/statements/AddReceiptStatement/:id',
        element: <AddReceiptStatement />,
        meta: {
            action: 'read',
            resource: 'lc'
        }
    },
    {
        path: '/statements/AddShipmentWeight/:id',
        element: <AddShipmentWeight />,
        meta: {
            action: 'read',
            resource: 'lc'
        }
    },
    {
        path: '/statements/DisplaySpecificStatement/:id',
        element: <InvoicePreview />,
        meta: {
            action: 'read',
            resource: 'lc'
        }
    },
    {
        path: '/statements/DisplayTrips/',
        element: <DisplayTrips />,
        meta: {
            action: 'read',
            resource: 'lc'
        }
    },
    {
        path: '/statements/DisplayStatements',
        element: <DisplayStatements />,
        meta: {
            action: 'read',
            resource: 'lc'
        }
    }
]

export default StatmentRoutes
