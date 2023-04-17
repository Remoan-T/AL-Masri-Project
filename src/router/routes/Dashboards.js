import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const DashboardRoutes = [
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />,
    meta: {
      action: 'manage',
      resource: 'ceo'
    }
  },
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />
  }
]

export default DashboardRoutes
