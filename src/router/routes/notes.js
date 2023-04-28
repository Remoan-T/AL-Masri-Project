import { lazy } from 'react'

const NoteForm = lazy(() => import('../../views/notes/noteForm'))
const ShowNotes = lazy(() => import('../../views/notes/showNotes'))

const NotesRoutes = [
    {
        path: '/notes/noteForm',
        element: <NoteForm />,
        meta: {
            action: 'read',
            resource: 'ceo'
        }
    },
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
