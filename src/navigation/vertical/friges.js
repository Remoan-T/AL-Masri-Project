// ** Icons Import
import { Home, Mail, MessageSquare, Circle, File, FileText, X, Check } from 'react-feather'

export default [



    {
        id: 'friges0',
        title: 'مستودع الصفري',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ws',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع الصفري',
                icon: <File size={12} />,
                navLink: '/friges/frige0/DisplayContentFrige0',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'خرج المستودع الصفري',
                icon: <FileText size={12} />,
                navLink: '/friges/frige0/DisplayOutputFrige0',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayContentLake',
                title: 'دخل المستودع الصفري',
                icon: <Check size={12} />,
                navLink: '/friges/frige0/DisplayInputFrige0',
                action: 'read',
                resource: 'ws'
            }
        ]
    },
    {
        id: 'friges1',
        title: 'مستودع صواعق 1',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ws',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع صواعق 1',
                icon: <File size={12} />,
                navLink: '/friges/frige1/DisplayContentFrige1',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'خرج المستودع صواعق 1',
                icon: <FileText size={12} />,
                navLink: '/friges/frige1/DisplayOutputFrige1',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayContentLake',
                title: 'دخل المستودع صواعق 1',
                icon: <Check size={12} />,
                navLink: '/friges/frige1/DisplayInputFrige1',
                action: 'read',
                resource: 'ws'
            }
        ]
    },
    {
        id: 'friges2',
        title: 'مستودع صواعق 2',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ws',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع صواعق 2',
                icon: <File size={12} />,
                navLink: '/friges/frige2/DisplayContentFrige2',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'خرج المستودع صواعق  2',
                icon: <FileText size={12} />,
                navLink: '/friges/frige2/DisplayOutputFrige2',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayContentLake',
                title: 'دخل المستودع صواعق 2',
                icon: <Check size={12} />,
                navLink: '/friges/frige2/DisplayInputFrige2',
                action: 'read',
                resource: 'ws'
            }
        ]
    },

    {
        id: 'friges3',
        title: 'مستودع صواعق 3',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ws',
        // badgeText: '2',
        children: [
            {
                id: 'DisplayInputsLake',
                title: 'محتويات مستودع صواعق 3',
                icon: <File size={12} />,
                navLink: '/friges/frige3/DisplayContentFrige3',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayOutputsLake',
                title: 'خرج المستودع صواعق  3',
                icon: <FileText size={12} />,
                navLink: '/friges/frige3/DisplayOutputFrige3',
                action: 'read',
                resource: 'ws'
            },
            {
                id: 'DisplayContentLake',
                title: 'دخل المستودع صواعق 3',
                icon: <Check size={12} />,
                navLink: '/friges/frige3/DisplayInputFrige3',
                action: 'read',
                resource: 'ws'
            }
        ]
    },

]