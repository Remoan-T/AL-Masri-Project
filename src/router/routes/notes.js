import { lazy } from 'react'

const noteForm = lazy(() => import('../../views/notes/noteForm'))
const showNotes = lazy(() => import('../../views/notes/showNotes'))

const NotesRoutes = [
    {
        path: '/notes/noteForm',
        element: <noteForm />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    },
    {
        path: '/notes/showNotes',
        element: <showNotes />
    }
]

export default NotesRoutes
