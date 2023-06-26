import { lazy } from 'react'

const DisplayInputStoreContent = lazy(() => import('../../views/ultimate store/DisplayInputStoreContent'))
const DisplayStoreContent = lazy(() => import('../../views/ultimate store/DisplayStoreContent'))

const ultimateStoreRoutes = [

    {
        path: '/ultimateStore/DisplayInputStoreContent',
        element: <DisplayInputStoreContent />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    }
    ,
    {
        path: '/ultimateStore/DisplayStoreContent',
        element: <DisplayStoreContent />,
        meta: {
            action: 'read',
            resource: ['ws','CEO']
        }
    }
]

export default ultimateStoreRoutes