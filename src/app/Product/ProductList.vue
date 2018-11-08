<template lang="pug">
  data-table(
    title="Products"
    route="/products"
    :headers="headers"
    :disableAdd="false"
    :disableDelete="false"
    no-results-text="No product found"
  )
</template>

<script>
import DataTable from '@/app/Arch/components/DataTable'

export default {
  name: 'product-list',
  components: {
    DataTable
  },
  data: () => ({
    headers: [
      { text: 'Name', value: 'name', align: 'left', width: '20%', sortable: false},
      { text: 'Price', value: 'price', align: 'left', width: '20%', sortable: false },
      { text: 'Image', value: 'image', align: 'left', width: '20%', sortable: false },
      { text: 'Category', value: 'category', align: 'left', width: '20%', sortable: false },
    ]
  })
}
</script>
