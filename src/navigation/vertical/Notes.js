// ** Icons Import
import { Home, Circle,Edit,List} from 'react-feather'

export default [
    {
        id: 'Notes',
        title: 'Notes',
        icon: <Edit size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ceo',
        // badgeText: '2',
        children: [

            {
                id: 'showNotes',
                title: 'Show Notes',
                icon: <List size={12} />,
                navLink: '/notes/showNotes',
                action: 'read',
                resource: 'ceo'
            },
            
        ]
    }
]
