import { lazy } from 'react'

const AddOutput = lazy(() => import('../../views/slaughter_supervisor/AddOutput/'))
const DisplayInput = lazy(() => import('../../views/slaughter_supervisor/DisplayInput/'))
const DisplayOutputs = lazy(() => import('../../views/slaughter_supervisor/DisplayOutputs/'))


const slaughterRoutes = [
    {
        path: '/slaughter/AddOutput',
        element: <AddOutput />,
        meta: {
            action: 'read',
            resource: 'ss'
        }
    },
    {
        path: '/slaughter/DisplayInputs',
        element: <DisplayInput />,
        meta: {
            action: 'read',
            resource: 'ss'
        }
    },
    {
        path: '/slaughter/DisplayOutputs',
        element: <DisplayOutputs />,
        meta: {
            action: 'read',
            resource: 'ss'
        }
    },
   
]

export default slaughterRoutes
