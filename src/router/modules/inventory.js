/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const inventoryRouter = {
  path: '/inventory',
  component: Layout,
  redirect: '/inventory/storage-check',
  name: 'Inventory',
  meta: {
    title: '库存系统',
    icon: 'table'
  },
  children: [
    {
      path: 'storage-check',
      component: () => import('@/views/inventory/storage-check'),
      name: 'StorageCheck',
      meta: { title: '查看剩余库存' }
    },
    {
      path: 'inventory-in',
      component: () => import('@/views/inventory/inventory-in'),
      name: 'InventoryIn',
      meta: { title: '入库明细' }
    },
    {
      path: 'inventory-out',
      component: () => import('@/views/inventory/inventory-out'),
      name: 'InventoryOut',
      meta: { title: '出库明细' }
    }
  ]
}
export default inventoryRouter
