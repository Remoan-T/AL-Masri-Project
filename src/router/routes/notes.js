import { lazy } from 'react'


const ShowNotes = lazy(() => import('../../views/notes/showNotes'))

const NotesRoutes = [

    {
        path: '/notes/showNotes',
        element: <ShowNotes />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    }
]

export default NotesRoutes
