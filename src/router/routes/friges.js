import { lazy } from 'react'

const DisplayContentFrige0 = lazy(() => import('../../views/friges/frige0/DisplayContentFrige0'))
const DisplayInputFrige0 = lazy(() => import('../../views/friges/frige0/DisplayInputFrige0'))
const DisplayOutputFrige0 = lazy(() => import('../../views/friges/frige0/DisplayOutputFrige0'))

const DisplayContentFrige1 = lazy(() => import('../../views/friges/frige1/DisplayContentFrige1'))
const DisplayInputFrige1 = lazy(() => import('../../views/friges/frige1/DisplayInputFrige1'))
const DisplayOutputFrige1 = lazy(() => import('../../views/friges/frige1/DisplayOutputFrige1'))

const DisplayContentFrige2 = lazy(() => import('../../views/friges/frige2/DisplayContentFrige2'))
const DisplayInputFrige2 = lazy(() => import('../../views/friges/frige2/DisplayInputFrige2'))
const DisplayOutputFrige2 = lazy(() => import('../../views/friges/frige2/DisplayOutputFrige2'))

const DisplayContentFrige3 = lazy(() => import('../../views/friges/frige3/DisplayContentFrige3'))
const DisplayInputFrige3 = lazy(() => import('../../views/friges/frige3/DisplayInputFrige3'))
const DisplayOutputFrige3 = lazy(() => import('../../views/friges/frige3/DisplayOutputFrige3'))

const AddOutputFrige3 = lazy(() => import('../../views/friges/frige3/AddOutputFrige3'))
const AddOutputFrige2 = lazy(() => import('../../views/friges/frige2/AddOutputFrige2'))
const AddOutputFrige1 = lazy(() => import('../../views/friges/frige1/AddOutputFrige1'))
const AddOutputFrige0 = lazy(() => import('../../views/friges/frige0/AddOutputFrige0'))


const frigesRoutes = [
    {
        path: '/friges/frige3/DisplayContentFrige3',
        element: <DisplayContentFrige3 />,
        meta: {
            action: 'read',
            resource: ['ws','CEO']
        }
    },
    {
        path: '/friges/frige3/DisplayInputFrige3',
        element: <DisplayInputFrige3 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige3/DisplayOutputFrige3',
        element: <DisplayOutputFrige3 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige2/DisplayContentFrige2',
        element: <DisplayContentFrige2 />,
        meta: {
            action: 'read',
            resource: ['ws','CEO']
        }
    },
    {
        path: '/friges/frige2/DisplayInputFrige2',
        element: <DisplayInputFrige2 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige2/DisplayOutputFrige2',
        element: <DisplayOutputFrige2 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige1/DisplayContentFrige1',
        element: <DisplayContentFrige1 />,
        meta: {
            action: 'read',
            resource: ['ws','CEO']
        }
    },
    {
        path: '/friges/frige1/DisplayInputFrige1',
        element: <DisplayInputFrige1 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    }
    ,
    {
        path: '/friges/frige1/DisplayOutputFrige1',
        element: <DisplayOutputFrige1 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },

    {
        path: '/friges/frige0/DisplayContentFrige0',
        element: <DisplayContentFrige0 />,
        meta: {
            action: 'read',
            resource: ['ws','CEO']
        }
    },
    {
        path: '/friges/frige0/DisplayInputFrige0',
        element: <DisplayInputFrige0 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    }
    ,
    {
        path: '/friges/frige0/DisplayOutputFrige0',
        element: <DisplayOutputFrige0 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige0/AddOutputFrige0/:id',
        element: <AddOutputFrige0 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige1/AddOutputFrige1/:id',
        element: <AddOutputFrige1 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige2/AddOutputFrige2/:id',
        element: <AddOutputFrige2 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },
    {
        path: '/friges/frige3/AddOutputFrige3/:id',
        element: <AddOutputFrige3 />,
        meta: {
            action: 'read',
            resource: 'ws'
        }
    },

]

export default frigesRoutes
