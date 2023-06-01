// ** Icons Import
import { Home, Circle,PenTool,List,XOctagon,FilePlus,CheckSquare } from 'react-feather'

export default [
    {
        id: 'Order',
        title: 'Orders',
        icon: <PenTool size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ceo',
        // badgeText: '2',
        children: [
           
            {
                id: 'AcceptableOrders',
                title: 'AcceptableOrders',
                icon: <CheckSquare size={12} />,
                navLink: '/order/AcceptableOrders',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'UnacceptableOrder',
                title: 'UnacceptableOrder',
                icon: <XOctagon size={12} />,
                navLink: '/order/UnacceptableOrder',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'addOrder',
                title: 'AddOrder',
                icon: <FilePlus size={12} />,
                navLink: '/order/AddOrder',
                action: 'read',
                resource: 'ceo'
            }
        ]
    }
]
