import { lazy } from 'react'

const DisplayTypeProductions = lazy(() => import('@src/views/production/DisplayTypeProductions.jsx'))
const DisplayAllWarehouse = lazy(() => import('@src/views/production/DisplayAllWarehouse.jsx'))
const AddCommandsToWarehouse = lazy(() => import('../../views/production/AddCommandsToWarehouse.jsx'))
const AddTypeProductions = lazy(() => import('../../views/production/AddTypeProductions.jsx'))
const DisplayCommandsProduction = lazy(() => import('../../views/production/DisplayCommandsProduction.jsx'))

const productionRoutes = [
    {
        path: '/production/DisplayTypeProductions',
        element: <DisplayTypeProductions />,
        meta: {
            action: 'read',
            resource: 'pm'
        }
    },
    {
        path: '/production/DisplayAllWarehouse',
        element: <DisplayAllWarehouse />,
        meta: {
            action: 'read',
            resource: 'pm'
        }
    },

    {
        path: '/production/AddTypeProductions',
        element: <AddTypeProductions />,
        meta: {
            action: 'read',
            resource: 'pm'
        }
    },
    {
        path: '/production/AddCommands',
        element: <AddCommandsToWarehouse />,
        meta: {
            action: 'read',
            resource: 'pm'
        }
    },
    {
        path: '/production/DisplayCommandsProduction',
        element: <DisplayCommandsProduction />,
        meta: {
            action: 'read',
            resource: 'pm'
        }
    },

]

export default productionRoutes
