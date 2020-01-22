/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const inventoryRouter = {
  path: '/sales',
  component: Layout,
  redirect: '/sales/sales-order',
  name: 'Sales',
  meta: {
    title: '销售数据',
    icon: 'table'
  },
  children: [
    {
      path: 'sales-order',
      component: () => import('@/views/sales/sales-order'),
      name: 'SalesOrder',
      meta: { title: '销售记录' }
    },
    {
      path: 'sales-report',
      component: () => import('@/views/sales/sales-report'),
      name: 'SalesReport',
      meta: { title: '销售报告' }
    }
  ]
}
export default inventoryRouter
