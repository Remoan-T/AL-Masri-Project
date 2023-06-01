// ** Icons Import
import { Home, Circle,UserPlus ,UserX,Users} from 'react-feather'

export default [
    {
        id: 'Drivers',
        title: 'Drivers',
        icon: <Users size={20} />,
        badge: 'light-warning',
        action: 'read',
        resource: 'mc',
        // badgeText: '2',
        children: [
            {
                id: 'registration',
                title: 'Add Driver',
                icon: <UserPlus size={15} />,
                navLink: '/Drivers/AddDrivers',
                action: 'read',
                resource: 'mc'
            },
            {
                id: 'DeletedDrivers',
                title: 'DeletedDrivers',
                icon: <UserX size={12} />,
                navLink: '/Drivers/DeletedDrivers',
                action: 'read',
                resource: 'mc'
            },
            {
                id: 'AvailableDrivers',
                title: 'AvailableDrivers',
                icon: <Users size={12} />,
                navLink: '/Drivers/AvailableDrivers',
                action: 'read',
                resource: 'mc'
            }
        ]
    }
]