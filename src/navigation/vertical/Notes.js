// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
    {
        id: 'Notes',
        title: 'Notes',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ceo',
        badgeText: '2',
        children: [
            {
                id: 'form',
                title: 'add note',
                icon: <Circle size={12} />,
                navLink: '/notes/noteForm',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'showNotes',
                title: 'Show Notes',
                icon: <Circle size={12} />,
                navLink: '/notes/showNotes',
                action: 'read',
                resource: 'ceo'
            },
            
        ]
    }
]
