/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const resalerRouter = {
  path: '/resaler',
  component: Layout,
  redirect: '/resaler/resaler-list',
  name: 'Resaler',
  meta: {
    title: '分销渠道',
    icon: 'table'
  },
  children: [
    {
      path: 'resaler',
      component: () => import('@/views/resaler/resaler-list'),
      name: 'ResalerList',
      meta: { title: '分销渠道列表' }
    },
    {
      path: 'resalerArea',
      component: () => import('@/views/resaler/resaler-area-list'),
      name: 'ResalerAreaList',
      meta: { title: '分销地区列表' }
    },
    {
      path: 'resalerRegion',
      component: () => import('@/views/resaler/resaler-region-list'),
      name: 'ResalerRegionList',
      meta: { title: '分销大区列表' }
    }
  ]
}
export default resalerRouter