// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
    {
        id: 'Order',
        title: 'Orders',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ceo',
        badgeText: '2',
        children: [
            {
                id: 'AllOrder',
                title: 'AllOrder',
                icon: <Circle size={12} />,
                navLink: '/order/OrderList',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'AcceptableOrders',
                title: 'AcceptableOrders',
                icon: <Circle size={12} />,
                navLink: '/order/AcceptableOrders',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'UnacceptableOrder',
                title: 'UnacceptableOrder',
                icon: <Circle size={12} />,
                navLink: '/order/AcceptableOrders',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'addOrder',
                title: 'AddOrder',
                icon: <Circle size={12} />,
                navLink: '/order/AddOrder',
                action: 'read',
                resource: 'ceo'
            }
        ]
    }
]
