import { lazy } from 'react'

const DisplayOrders = lazy(() => import('../../views/warehouse/DisplayOrders'))
const DisplayContentWarehouse = lazy(() => import('../../views/warehouse/DisplayContentWarehouse'))
const DisplayContentLake = lazy(() => import('../../views/warehouse/DisplayContentLake'))
const DisplayInputsLake = lazy(() => import('../../views/warehouse/DisplayInputsLake'))
const DisplayOutputsLake = lazy(() => import('../../views/warehouse/DisplayOutputsLake'))
const AddOrder = lazy(() => import('../../views/warehouse/Add Order'))
const AddOutputLake = lazy(() => import('../../views/warehouse/AddOutputLake'))


const FarmsOffers = lazy(() => import('../../views/farms/FarmsOffers'))
const FarmsList = lazy(() => import('../../views/farms/registration requests'))

const WarehouseRoutes = [
    {
        path: '/Warehouse/DisplayOrders',
        element: <DisplayOrders />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/Warehouse/DisplayContentWarehouse',
        element: <DisplayContentWarehouse />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    }
    ,
    {
        path: '/Warehouse/DisplayOutputsLake',
        element: <DisplayOutputsLake />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    }
    ,
    {
        path: '/Warehouse/DisplayInputsLake',
        element: <DisplayInputsLake />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },

    {
        path: '/Warehouse/AddOrder/:id',
        element: <AddOrder />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/Warehouse/DisplayContentLake',
        element: <DisplayContentLake />,
        meta: {
            action: 'read',
            resource: ['ws','CEO']
        }
    },
    {
        path: '/Warehouse/AddOutputLake/:id',
        element: <AddOutputLake />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },

]

export default WarehouseRoutes
