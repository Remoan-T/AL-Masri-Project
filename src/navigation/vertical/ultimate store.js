// ** Icons Import
import { Home, Mail, MessageSquare, Circle, File, FileText, X, Check } from 'react-feather'

export default [
    {
        id: 'Store',
        title: 'المخزن',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ws',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayInputsStore',
                title: 'دخل المخزن النهائي',
                icon: <File size={12} />,
                navLink: '/ultimateStore/DisplayInputStoreContent',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'محتويات المخزن النهائي',
                icon: <FileText size={12} />,
                navLink: '/ultimateStore/DisplayStoreContent',
                action: 'read',
                resource: 'ws'
            }
        ]
    }
]