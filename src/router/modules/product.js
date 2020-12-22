/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/product',
  name: 'Product Info',
  meta: {
    title: '产品信息',
    icon: 'table'
  },
  children: [
    {
      path: 'product-type',
      component: () => import('@/views/product/product-type'),
      name: 'Product Type',
      meta: { title: '产品类型' }
    },
    {
      path: 'product-sub-type',
      component: () => import('@/views/product/product-sub-type'),
      name: 'Product Sub Type',
      meta: { title: '产品细分' }
    },
    {
      path: 'product',
      component: () => import('@/views/product/product'),
      name: 'Product',
      meta: { title: '产品' }
    }
  ]
}
export default productRouter
