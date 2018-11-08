import CrudForge from '@/app/Arch/CrudForge'
import ExampleForm from '@/app/Example/ExampleForm'

export default [
  {
    path: '/examples',
    component: CrudForge,
    props: { route: 'examples', title: 'Example' },
    meta: {
      sidebar: {
        icon: 'account_circle',
        title: 'Example'
      }
    },
    children: [
      {
        path: '/',
        component: () => import('@/app/Example/ExampleList'),
        meta: { title: 'Example List' }
      },
      {
        path: 'new',
        component: ExampleForm,
        meta: { title: 'Example' }
      },
      {
        path: 'edit/:id',
        component: ExampleForm,
        meta: { title: 'Example' }
      }
    ]
  }
]
