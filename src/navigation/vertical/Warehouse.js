// ** Icons Import
import { Home, Mail, MessageSquare, Circle, File, FileText, X, Check } from 'react-feather'

export default [


    {
        id: 'DisplayOrders',
        title: 'DisplayOrders',
        icon: <Mail size={20} />,
        navLink: '/Warehouse/DisplayOrders',
        action: 'read',
        resource: 'ws'
    },
    {
        id: 'DisplayContentWarehouse',
        title: 'DisplayContentWarehouse',
        icon: <MessageSquare size={20} />,
        navLink: '/Warehouse/DisplayContentWarehouse',
        action: 'read',
        resource: 'ws'
    },
    // ,

    {
        id: 'lakes',
        title: 'lakes',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ws',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayInputsLake',
                title: 'DisplayInputsLake',
                icon: <File size={12} />,
                navLink: '/Warehouse/DisplayInputsLake',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'DisplayOutputsLake',
                icon: <FileText size={12} />,
                navLink: '/Warehouse/DisplayOutputsLake',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayContentLake',
                title: 'DisplayContentLake',
                icon: <Check size={12} />,
                navLink: '/Warehouse/DisplayContentLake',
                action: 'read',
                resource: 'ws'
            }
        ]
    }
]