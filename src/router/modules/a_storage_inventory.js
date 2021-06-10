/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const inventoryRouter = {
  path: '/a-inventory',
  component: Layout,
  redirect: '/inventory/a-storage-check',
  name: 'AInventory',
  meta: {
    title: 'A-直营仓库存系统',
    icon: 'table'
  },
  children: [
    {
      path: 'a-storage-check',
      component: () => import('@/views/a-storage-inventory/a-storage-check'),
      name: 'AStorageCheck',
      meta: { title: '查看剩余库存' }
    },
    {
      path: 'a-inventory-in',
      component: () => import('@/views/a-storage-inventory/a-inventory-in'),
      name: 'AInventoryIn',
      meta: { title: '入库明细' }
    },
    {
      path: 'a-inventory-out',
      component: () => import('@/views/a-storage-inventory/a-inventory-out'),
      name: 'AInventoryOut',
      meta: { title: '出库明细' }
    }
  ]
}
export default inventoryRouter
