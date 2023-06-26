// ** Icons Import
import { Mail, MessageSquare, Home,CheckSquare, Calendar, FileText, Check, ShoppingCart, File, Shield } from 'react-feather'

export default [
    {
        header: 'Apps & Pages'
    },
    {
        id: 'Users',
        title: 'Users',
        icon: <Mail size={20} />,
        navLink: '/Users/ShowUsers',
        action: 'read',
        resource: 'CEO'
    },
    {
        id: 'ShowRequests',
        title: 'ShowRequests',
        icon: <MessageSquare size={20} />,
        navLink: '/Requests/ShowRequests',
        action: 'read',
        resource: 'CEO'
    },
    {
        id: 'Outputs',
        title: 'Outputs',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'CEO',
        // badgeText: '2',
        children: [
            {
                id: 'DisplaySlaughterOutputs',
                title: 'DisplaySlaughterOutputs',
                icon: <File size={12} />,
                navLink: '/slaughter/DisplayOutputs',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayCuttingOutputs',
                title: 'DisplayCuttingOutputs',
                icon: <FileText size={12} />,
                navLink: '/cutting/DisplayCuttingOutputs',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayManufacturingOutputs',
                title: 'DisplayManufacturingOutputs',
                icon: <Check size={12} />,
                navLink: '/manufacturing/DisplayManufacturingOutputs',
                action: 'read',
                resource: 'CEO'
            },

        ]
    },
    {
        id: 'viewWarehousesContent',
        title: 'viewWarehousesContent',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'CEO',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayContentLake',
                title: 'DisplayContentLake',
                icon: <Check size={12} />,
                navLink: '/Warehouse/DisplayContentLake',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع الصفري',
                icon: <File size={12} />,
                navLink: '/friges/frige0/DisplayContentFrige0',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع صواعق 1',
                icon: <File size={12} />,
                navLink: '/friges/frige1/DisplayContentFrige1',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع صواعق 2',
                icon: <File size={12} />,
                navLink: '/friges/frige2/DisplayContentFrige2',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع صواعق 3',
                icon: <File size={12} />,
                navLink: '/friges/frige3/DisplayContentFrige3',
                action: 'read',
                resource: 'CEO'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'محتويات المخزن النهائي',
                icon: <FileText size={12} />,
                navLink: '/ultimateStore/DisplayStoreContent',
                action: 'read',
                resource: 'CEO'
            }

        ]
    }
    // ,
    // {
    //     id: 'DisplayCuttingInput',
    //     title: 'DisplayCuttingInput',
    //     icon: <MessageSquare size={20} />,
    //     navLink: '/cutting/DisplayCuttingInput',
    //     action: 'read',
    //     resource: 'cs'
    // },
    // {
    //     id: 'DisplayCurrentOutput',
    //     title: 'DisplayCurrentOutput',
    //     icon: <MessageSquare size={20} />,
    //     navLink: '/cutting/DisplayCurrentOutput',
    //     action: 'read',
    //     resource: 'cs'
    // },
]
