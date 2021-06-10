/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const inventoryRouter = {
  path: '/b-inventory',
  component: Layout,
  redirect: '/inventory/b-storage-check',
  name: 'BInventory',
  meta: {
    title: 'B-分销仓库存系统',
    icon: 'table'
  },
  children: [
    {
      path: 'b-storage-check',
      component: () => import('@/views/b-storage-inventory/b-storage-check'),
      name: 'BStorageCheck',
      meta: { title: '查看剩余库存' }
    },
    {
      path: 'b-inventory-in',
      component: () => import('@/views//b-storage-inventory/b-inventory-in'),
      name: 'BInventoryIn',
      meta: { title: '入库明细' }
    },
    {
      path: 'b-inventory-out',
      component: () => import('@/views//b-storage-inventory/b-inventory-out'),
      name: 'BInventoryOut',
      meta: { title: '出库明细' }
    }
  ]
}
export default inventoryRouter
