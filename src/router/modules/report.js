/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: '/report/general-sales-report',
  name: 'Report',
  meta: {
    title: '销售相关数据',
    icon: 'table'
  },
  children: [
    {
      path: 'general-sales-report',
      component: () => import('@/views/report/general-sales-report'),
      name: 'Histroy Sales Order',
      meta: { title: '月销售金额统计' }
    },
    {
      path: 'detail-sales-report',
      component: () => import('@/views/sales/direct-sales-order'),
      name: 'Direct Sales Order',
      meta: { title: '销售详细报告（开发中...）' }
    }
  ]
}
export default reportRouter
