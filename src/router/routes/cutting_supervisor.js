import { lazy } from 'react'

const DisplayTotalInput = lazy(() => import('@src/views/cuttingSupervisor/displayTotalInput/'))
const DisplayCuttingInput = lazy(() => import('@src/views/cuttingSupervisor/displayCuttingInput/'))
const DisplayCuttingOutputs = lazy(() => import('@src/views/cuttingSupervisor/displayCuttingOutput/'))
const AddCuttingOutput = lazy(() => import('@src/views/cuttingSupervisor/AddOutput'))
const DisplayCurrentOutput = lazy(() => import('@src/views/cuttingSupervisor/displayCurrentOutput'))

const cuttingRoutes = [
    {
        path: '/cutting/DisplayTotalInput',
        element: <DisplayTotalInput />,
        meta: {
            action: 'read',
            resource: 'cs'
        }
    },
    {
        path: '/cutting/DisplayCuttingInput',
        element: <DisplayCuttingInput />,
        meta: {
            action: 'read',
            resource: 'cs'
        }
    },
    {
        path: '/cutting/DisplayCuttingOutputs',
        element: <DisplayCuttingOutputs />,
        meta: {
            action: 'read',
            resource: 'cs'
        }
    },
    {
        path: '/Cutting/AddOutput/:id',
        element: <AddCuttingOutput />,
        meta: {
            action: 'read',
            resource: 'cs'
        }
    },
    {
        path: '/Cutting/DisplayCurrentOutput/',
        element: <DisplayCurrentOutput />,
        meta: {
            action: 'read',
            resource: 'cs'
        }
    },

]

export default cuttingRoutes
