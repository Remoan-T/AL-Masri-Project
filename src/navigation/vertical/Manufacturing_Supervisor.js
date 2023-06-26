// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

export default [
    {
        header: 'Apps & Pages'
    },
    {
        id: 'DisplayTotalManufacturingInput',
        title: 'DisplayTotalManufacturingInput',
        icon: <Mail size={20} />,
        navLink: '/manufacturing/DisplayTotalManufacturingInput',
        action: 'read',
        resource: 'ms'
    },
    {
        id: 'DisplayManufacturingOutputs',
        title: 'DisplayManufacturingOutputs',
        icon: <MessageSquare size={20} />,
        navLink: '/manufacturing/DisplayManufacturingOutputs',
        action: 'read',
        resource: 'ms'
    }
    ,
    {
        id: 'DisplayManufacturingInput',
        title: 'DisplayManufacturingInput',
        icon: <MessageSquare size={20} />,
        navLink: '/manufacturing/DisplayManufacturingInput',
        action: 'read',
        resource: 'ms'
    },
    {
        id: 'DisplayCurrentManufacturingOutput',
        title: 'DisplayCurrentManufacturingOutput',
        icon: <MessageSquare size={20} />,
        navLink: '/manufacturing/DisplayCurrentManufacturingOutput',
        action: 'read',
        resource: 'ms'
    },
]
