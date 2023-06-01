// ** Icons Import
import { Home, Circle,File,FileText,X,Check } from 'react-feather'

export default [
    {
        id: 'Farms',
        title: 'Farms',
        icon: <Home size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'ceo',
        // badgeText: '2',
        children: [
            {
                id: 'registration',
                title: 'registration requests farm',
                icon: <File size={12} />,
                navLink: '/farms/FarmsList',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'FarmsOffers',
                title: 'FarmsOffers',
                icon: <FileText size={12} />,
                navLink: '/farms/FarmsOffers',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'FarmsAvailable',
                title: 'FarmsAvailable',
                icon: <Check size={12} />,
                navLink: '/farms/FarmsAvailable',
                action: 'read',
                resource: 'ceo'
            },
            {
                id: 'FarmsDeleted',
                title: 'FarmsDeleted',
                icon: <X size={12} />,
                navLink: '/farms/FarmsDeleted',
                action: 'read',
                resource: 'ceo'
            }
        ]
    }
]
