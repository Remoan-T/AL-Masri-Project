// ** Icons Import
import { Home, Circle,Truck ,Plus,X,Check} from 'react-feather'

export default [
    {
        id: 'Trucks',
        title: 'Trucks',
        icon: <Truck size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'mc',
        // badgeText: '2',
        children: [
            {
                id: 'registration',
                title: 'Add Truck',
                icon: <Plus size={12} />,
                navLink: '/trucks/AddTruck',
                action: 'read',
                resource: 'mc'
            },
            {
                id: 'DeletedTrucks',
                title: 'DeletedTrucks',
                icon: <X size={12} />,
                navLink: '/trucks/DeletedTrucks',
                action: 'read',
                resource: 'mc'
            },
            {
                id: 'AvailableTrucks',
                title: 'AvailableTrucks',
                icon: <Check size={12} />,
                navLink: '/trucks/AvailableTrucks',
                action: 'read',
                resource: 'mc'
            }
        ]
    }
]
