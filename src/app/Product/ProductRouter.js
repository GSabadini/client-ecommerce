import CrudForge from '@/app/Arch/CrudForge'
import ProductForm from '@/app/Product/ProductForm'
import ProductList from '@/app/Product/ProductList'

export default [
  {
    path: '/products',
    component: CrudForge,
    props: { route: 'products', title: 'Products' },
    meta: {
      sidebar: {
        icon: 'account_circle',
        title: 'Products'
      }
    },
    children: [
      {
        path: '/',
        component: ProductList,
        meta: { title: 'Product list' }
      },
      {
        path: 'new',
        component: ProductForm,
        meta: { title: 'Product' }
      },
      {
        path: 'edit/:id',
        component: ProductForm,
        meta: { title: 'Product' }
      }
    ]
  }
]
