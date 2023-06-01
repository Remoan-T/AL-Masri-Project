// ** Icons Import
import { Home, Circle, Map, Plus, Check } from 'react-feather'

export default [
    {
        id: 'Trips',
        title: 'Trips',
        icon: <Map size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'mc',
        // badgeText: '2',
        children: [
            // {
            //     id: 'registration',
            //     title: 'Add Trips',
            //     icon: <Plus size={12} />,
            //     navLink: '/trips/AddTrips/:id',
            //     action: 'read',
            //     resource: 'mc'
            // },

            {
                id: 'AvailableTrips',
                title: 'AvailableTrips',
                icon: <Check size={12} />,
                navLink: '/trips/AvailableTrips',
                action: 'read',
                resource: 'mc'
            }
            ,

            {
                id: 'DisplayOrderPurches',
                title: 'DisplayOrderPurches',
                icon: <Check size={12} />,
                navLink: '/trips/DisplayOrderPurches',
                action: 'read',
                resource: 'mc'
            }
        ]
    }
]