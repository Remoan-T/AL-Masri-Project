// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

export default [
    {
        header: 'Apps & Pages'
    },
    {
        id: 'DisplayInputs',
        title: 'DisplayInputs',
        icon: <Mail size={20} />,
        navLink: '/slaughter/DisplayInputs',
        action: 'read',
        resource: 'ss'
    },
    {
        id: 'DiplayOutputs',
        title: 'DiplayOutputs',
        icon: <MessageSquare size={20} />,
        navLink: '/slaughter/DisplayOutputs',
        action: 'read',
        resource: 'ss'
    }
    ,
    {
        id: 'AddOutput',
        title: 'AddOutput',
        icon: <MessageSquare size={20} />,
        navLink: '/slaughter/AddOutput',
        action: 'read',
        resource: 'ss'
    },
]
