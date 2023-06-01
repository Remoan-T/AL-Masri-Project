// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

export default [
    {
        header: 'Apps & Pages'
    },
    {
        id: 'DisplayTotalInput',
        title: 'DisplayTotalInput',
        icon: <Mail size={20} />,
        navLink: '/cutting/DisplayTotalInput',
        action: 'read',
        resource: 'cs'
    },
    {
        id: 'DisplayCuttingOutputs',
        title: 'DisplayCuttingOutputs',
        icon: <MessageSquare size={20} />,
        navLink: '/cutting/DisplayCuttingOutputs',
        action: 'read',
        resource: 'cs'
    }
    ,
    {
        id: 'DisplayCuttingInput',
        title: 'DisplayCuttingInput',
        icon: <MessageSquare size={20} />,
        navLink: '/cutting/DisplayCuttingInput',
        action: 'read',
        resource: 'cs'
    },
    {
        id: 'DisplayCurrentOutput',
        title: 'DisplayCurrentOutput',
        icon: <MessageSquare size={20} />,
        navLink: '/cutting/DisplayCurrentOutput',
        action: 'read',
        resource: 'cs'
    },
]
