/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const memberRouter = {
  path: '/member',
  component: Layout,
  redirect: '/member/list',
  name: 'Member',
  meta: {
    title: '会员系统',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/member/member-list'),
      name: 'Member List',
      meta: { title: '会员列表' }
    },
    {
      path: 'member',
      component: () => import('@/views/member/member-chart'),
      name: 'Member Report',
      meta: { title: '会员报告' }
    }
  ]
}
export default memberRouter
