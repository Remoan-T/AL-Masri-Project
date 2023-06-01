// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

export default [
    {
        header: 'Apps & Pages'
    },

    {
        id: 'DisplayTrips',
        title: 'DisplayTrips',
        icon: <Mail size={20} />,
        navLink: '/statements/DisplayTrips',
        action: 'read',
        resource: 'lc'
    },

    {
        id: 'DisplaySpecificStatement',
        title: 'DisplaySpecificStatement',
        icon: <MessageSquare size={20} />,
        navLink: '/statements/DisplaySpecificStatement',
        action: 'read',
        resource: 'lc'
    }
    ,
    {
        id: 'DisplayStatements',
        title: 'DisplayStatements',
        icon: <MessageSquare size={20} />,
        navLink: '/statements/DisplayStatements',
        action: 'read',
        resource: 'lc'
    },
]
