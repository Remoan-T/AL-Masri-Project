// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
    {
        id: 'ports',
        title: 'SellingPort',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ceo',
        badgeText: '2',
        children: [
            {
                id: 'registration',
                title: 'registration requests',
                icon: <Circle size={12} />,
                navLink: '/SellingPort/RegistrationRequestsSelling',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'ShowSellingPort',
                title: 'SellingPortRequests',
                icon: <Circle size={12} />,
                navLink: '/SellingPort/SellingPortRequests',
                action: 'read',
                resource: 'ceo'

            },
            {
                id: 'SellingPortList',
                title: 'SellingPortList',
                icon: <Circle size={12} />,
                navLink: '/SellingPort/SellingPortList',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'SellingPortDeleted',
                title: 'SellingPortDeleted',
                icon: <Circle size={12} />,
                navLink: '/SellingPort/SellingPortDeleted',
                action: 'read',
                resource: 'ceo'
            }
        ]
    }
]
