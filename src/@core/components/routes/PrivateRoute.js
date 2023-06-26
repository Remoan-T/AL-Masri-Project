// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  // const ability = useContext(AbilityContext)
  // const ability = localStorage.ability
  const user = JSON.parse(localStorage.getItem('userData'))

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = true

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      return <Navigate to='/login' />
    }
    if (user && restrictedRoute) {
      return <Navigate to='/' />
    }
    if (user.managing_level == 'Purchasing-and-Sales-manager' && route.meta.resource != 'ceo' && route.meta.resource != 'ACL') {
      // console.log(user.managing_level)
      // console.log(route.meta.resource)
      return <Navigate to='/misc/not-authorized' replace />
      // console.log(route)
    }
    if (user.managing_level == 'Mechanism-Coordinator' && route.meta.resource != 'mc' && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'libra-commander' && route.meta.resource != 'lc' && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'slaughter_supervisor' && !route.meta.resource.includes('ss') && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'cutting_supervisor' && !route.meta.resource.includes('cs') && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'warehouse_supervisor' && !route.meta.resource.includes('ws') && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'Manufacturing_Supervisor' && !route.meta.resource.includes('ms') && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'Production_Manager' && !route.meta.resource.includes('pm') && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }
    if (user.managing_level == 'ceo' && !route.meta.resource.includes('CEO') && route.meta.resource != 'ACL') {
      return <Navigate to='/misc/not-authorized' replace />
    }

    // if (user && route.path == "login" ) {
    //   // return <Navigate to='/' />
    //   console.log('ssss')
    // }
    // if (user && restrictedRoute && user.managing_level === 'Purchasing-and-Sales-manager') {
    //   return <Navigate to='/access-control' />
    // }
    // if (user && !ability.can(action || 'read', resource)) {
    //   console.log(ability)
    //   // return <Navigate to='/misc/not-authorized' replace />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
