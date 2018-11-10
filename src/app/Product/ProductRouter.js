import CrudForge from '@/app/Arch/CrudForge'
import ProductForm from '@/app/Product/ProductForm'
import ProductDataTable from '@/app/Product/ProductDataTable'

export default [
  {
    path: '/products',
    component: CrudForge,
    props: { route: 'products', title: 'Products' },
    meta: {
      sidebar: {
        icon: 'shopping_cart',
        title: 'Products'
      }
    },
    children: [
      {
        path: '/',
        component: ProductDataTable,
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
