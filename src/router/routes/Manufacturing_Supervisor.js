import { lazy } from 'react'

const DisplayTotalManufacturingInput = lazy(() => import('@src/views/Manufacturing_Supervisor/displayTotalInput/'))
const DisplayManufacturingInput = lazy(() => import('@src/views/Manufacturing_Supervisor/displayManufacturingInput/'))
const DisplayManufacturingOutputs = lazy(() => import('@src/views/Manufacturing_Supervisor/displayManufacturingOutput/'))
const AddManufacturingOutput = lazy(() => import('@src/views/Manufacturing_Supervisor/AddOutput'))
const DisplayCurrentManufacturingOutput = lazy(() => import('@src/views/Manufacturing_Supervisor/displayCurrentOutput'))

const manufacturingRoutes = [
    {
        path: '/manufacturing/DisplayTotalManufacturingInput',
        element: <DisplayTotalManufacturingInput />,
        meta: {
            action: 'read',
            resource: 'ms'
        }
    },
    {
        path: '/manufacturing/DisplayManufacturingInput',
        element: <DisplayManufacturingInput />,
        meta: {
            action: 'read',
            resource: 'ms'
        }
    },
    {
        path: '/manufacturing/DisplayManufacturingOutputs',
        element: <DisplayManufacturingOutputs />,
        meta: {
            action: 'read',
            resource: ['ms', 'CEO', 'pm']
        }
    },
    {
        path: '/manufacturing/AddOutput/:id',
        element: <AddManufacturingOutput />,
        meta: {
            action: 'read',
            resource: 'ms'
        }
    },
    {
        path: '/manufacturing/DisplayCurrentManufacturingOutput/',
        element: <DisplayCurrentManufacturingOutput />,
        meta: {
            action: 'read',
            resource: 'ms'
        }
    },

]

export default manufacturingRoutes
