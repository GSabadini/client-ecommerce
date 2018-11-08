<template lang="pug">
  data-table(
    title="Example"
    route="/examples"
    :headers="headers"
    :disableAdd="false"
    :disableDelete="false"
    no-results-text="Nenhum dado encontrado"
  )
</template>

<script>
import DataTable from '@/app/Arch/components/DataTable'

export default {
  components: {
    DataTable
  },
  data: () => ({
    headers: [
      {
        text: 'Avatar',
        value: 'avatar',
        align: 'left',
        width: '20%',
        sortable: false 
      },
      { text: 'Nome', value: 'name', align: 'left', width: '20%', sortable: false }
    ]
  })
}
</script>
