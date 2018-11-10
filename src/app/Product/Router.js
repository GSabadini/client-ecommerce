import CrudForge from '@/app/Arch/CrudForge'
import BackofficeForm from '@/app/Product/BackofficeForm'
import BackofficeDataTable from '@/app/Product/BackofficeDataTable'

export default [
  {
    path: 'products',
    component: CrudForge,
    props: { route: 'backoffice/products', title: 'Products' },
    meta: {
      sidebar: {
        icon: 'shopping_cart',
        title: 'Products'
      }
    },
    children: [
      {
        path: '/',
        component: BackofficeForm,
        meta: { title: 'Product list' }
      },
      {
        path: 'new',
        component: BackofficeDataTable,
        meta: { title: 'Product' }
      },
      {
        path: 'edit/:id',
        component: BackofficeDataTable,
        meta: { title: 'Product' }
      }
    ]
  }
]
