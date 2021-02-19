/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const inventoryRouter = {
  path: '/sales',
  component: Layout,
  redirect: '/sales/sales-order',
  name: 'Sales',
  meta: {
    title: '订单',
    icon: 'table'
  },
  children: [
    {
      path: 'sales-order',
      component: () => import('@/views/sales/sales-order'),
      name: 'Histroy Sales Order',
      meta: { title: '历史销售记录(即将删除)', role: [1] }
    },
    {
      path: 'direct-sales-order',
      component: () => import('@/views/sales/direct-sales-order'),
      name: 'Direct Sales Order',
      meta: { title: '直营订单记录' }
    },
    {
      path: 'resaler-sales-order',
      component: () => import('@/views/sales/resaler-sales-order'),
      name: 'Resaler Sales Order',
      meta: { title: '分销订单记录' }
    },
    {
      path: 'marketing-order',
      component: () => import('@/views/sales/marketing-order'),
      name: 'Marketing Order',
      meta: { title: '市场订单记录' }
    },
    {
      path: 'in-review-sales-order',
      component: () => import('@/views/sales/in-review-order'),
      name: 'In Review Sales Order',
      meta: { title: '需审核销售订单列表' }
    },
    {
      path: 'in-review-marketing-order',
      component: () => import('@/views/sales/in-review-marketing-order'),
      name: 'In Review Marketing Order',
      meta: { title: '需审核市场订单列表' }
    }
  ]
}
export default inventoryRouter
