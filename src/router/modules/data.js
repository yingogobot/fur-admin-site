/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataRouter = {
  path: '/data',
  component: Layout,
  redirect: '/data/sales-channel',
  name: 'Data',
  meta: {
    title: '数据系统',
    icon: 'table'
  },
  children: [
    {
      path: 'sales-channel',
      component: () => import('@/views/data/sales-channel'),
      name: 'Sales Channel',
      meta: { title: '直销渠道列表' }
    },
    {
      path: 'event',
      component: () => import('@/views/data/event'),
      name: 'Event',
      meta: { title: '线下活动列表' }
    },
    {
      path: 'resaler',
      component: () => import('@/views/data/resaler'),
      name: 'Resaler',
      meta: { title: '分销渠道列表' }
    }
  ]
}
export default dataRouter
