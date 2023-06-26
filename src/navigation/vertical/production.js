// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, Edit, List } from 'react-feather'

export default [
    {
        header: 'Apps & Pages'
    },
    {
        id: 'DisplayTypeProductions',
        title: 'انواع الانتاج',
        icon: <Mail size={20} />,
        navLink: '/production/DisplayTypeProductions',
        action: 'read',
        resource: 'pm'
    },
    {
        id: 'DisplayAllWarehouse',
        title: 'محتويات المخازن',
        icon: <MessageSquare size={20} />,
        navLink: '/production/DisplayAllWarehouse',
        action: 'read',
        resource: 'pm'
    }
    ,
    {
        id: 'DisplayCommandsProduction',
        title: 'عرض اوامر الانتاج',
        icon: <MessageSquare size={20} />,
        navLink: '/production/DisplayCommandsProduction',
        action: 'read',
        resource: 'pm'
    },
    {
        id: 'Outputs',
        title: 'Outputs',
        icon: <MessageSquare size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'pm',
        // badgeText: '2',
        children: [

            {
                id: 'DisplayCuttingOutputs',
                title: 'DisplayCuttingOutputs',
                icon: <MessageSquare size={20} />,
                navLink: '/cutting/DisplayCuttingOutputs',
                action: 'read',
                resource: 'pm'
            }
            ,
            {
                id: 'DisplayManufacturingOutputs',
                title: 'DisplayManufacturingOutputs',
                icon: <MessageSquare size={20} />,
                navLink: '/manufacturing/DisplayManufacturingOutputs',
                action: 'read',
                resource: 'pm'
            }
            ,
            {
                id: 'DiplayOutputs',
                title: 'DiplayOutputs',
                icon: <MessageSquare size={20} />,
                navLink: '/slaughter/DisplayOutputs',
                action: 'read',
                resource: 'pm'
            }
        ]
    },
    // {
    //     id: 'Notes',
    //     title: 'Notes',
    //     icon: <Edit size={20} />,
    //     badge: 'light-warning',
    //     action: 'read',
    //     resource: 'pm',
    //     // badgeText: '2',
    //     children: [

    //         {
    //             id: 'showNotes',
    //             title: 'Show Notes',
    //             icon: <List size={12} />,
    //             navLink: '/notes/showNotes',
    //             action: 'read',
    //             resource: 'pm'
    //         },

    //     ]
    // }

]
