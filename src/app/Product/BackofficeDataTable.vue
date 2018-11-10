<template lang="pug">
  card-default
    v-toolbar.elevation-1.py-2(color="grey lighten-4")
      v-toolbar-title Products
        v-icon(color="primary").ml-2 assessment
      v-spacer
      v-tooltip(bottom)
        v-btn.mt-2(
          id="botao"
          color="primary"
          right
          absolute
          fab
          slot="activator"
          @click="goToForm()"
          )
          v-icon add
        span Add
    v-card-text
      v-card-title
        .title
          v-flex(xs6)
            lazy-text-field(:search-term.sync="searchTerm")
      v-data-table.elevation-5.mt-1.table-nowrap(
        id="listTable"
        no-data-text="Nenhum registro encontrado"
        no-results-text="Nenhum resultado encontrado"
        :headers="headers"
        :items="items"
        hide-actions
        :pagination.sync="pagination"
        :loading="true"
        )
        template(slot="items" slot-scope="props")
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.price | moneyFormat }}
          td.text-xs-left
            v-avatar.my-2(:size="70")
              v-img(:src="returnPhoto(props.item.image)")
          td.text-xs-left {{ props.item.category.name }}
          td.text-xs-left.cursor-pointer
            v-tooltip(top)
              v-btn.ma-0(
                icon
                flat
                dark
                color="grey darken-3"
                small
                slot="activator"
                @click="editRow(props.item.id)"
                )
                v-icon.grey--text.text--darken-2 edit
              span Edit
            v-tooltip(top)
              v-btn(
                icon
                flat
                dark
                color="grey darken-3"
                small
                slot="activator"
                @click="deleteRow(props.item.id)"
                )
                v-icon.grey--text.text--darken-2 delete
              span Delete
    .text-xs-center.py-3
      v-pagination(
        v-model="currentPage"
        :length="pages"
        )
</template>

<script>
import CardDefault from '@/app/Arch/components/CardDefault'
import LazyTextField from '@/app/Arch/components/LazyTextField'
import ProductService from './Service'
import messageNotification from '@/mixins/messageNotification'
import moneyFormat from '@/filters/moneyFormat'

export default {
  name: 'product-data-table',
  components: {
    CardDefault,
    LazyTextField
  },
  mixins: [
    messageNotification
  ],
  data: () => ({
    currentPage: 1,
    searchTerm: '',
    pagination: {
      rowsPerPage: 15,
      totalItems: null
    },
    metadata: {},
    items: [],
    headers: [
      { text: 'Name', value: 'name', align: 'left', width: '20%', sortable: false },
      { text: 'Price', value: 'price', align: 'left', width: '20%', sortable: false },
      { text: 'Image', value: 'image', align: 'left', width: '20%', sortable: false },
      { text: 'Category', value: 'category.name', align: 'left', width: '20%', sortable: false },
      { text: 'Actions', value: 'actions', align: 'left', width: '20%', sortable: false }
    ],
    uri: 'products',
    uriImage: 'http://localhost:8081/products'
  }),
  computed: {
    pages () {
      let { rowsPerPage, totalItems } = this.pagination
      if (rowsPerPage == null || totalItems == null) {
        return 0
      }
      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts (page) {
      ProductService
        .getProducts(page)
        .then(({ data }) => {
          this.items = data.data
          this.currentPage = data.current_page
          this.pagination.totalItems = data.total
        })
    },
    editRow (id) {
      this
        .$router
        .push(`${this.uri}/edit/${id}`)
    },
    deleteRow (id) {
      const options = {
        title: 'Warning !!!',
        text: 'Are you sure you want to delete this record ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3e4094',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }

      this
        .$swal(options)
        .then((result) => {
          if (result.value) {
            this.deleteProduct(id)
          }
        }, () => {})
    },
    deleteProduct (id) {
      ProductService
        .deleteProduct(id)
        .then(() => {
          this.getProducts()
          this.messageSuccess('Product successfully deleted')
        })
    },
    goToForm () {
      this
        .$router
        .push(`${this.uri}/new`)
    },
    returnPhoto (image) {
      if (image) {
        return `${this.uriImage}/${image}`
      }
      return ''
    }
  },
  watch: {
    currentPage (newValue) {
      this.getProducts(newValue)
    }
  }
}
</script>

<style lang="stylus">
.title
  display flex
  justify-content space-between
  width 100%
.table-nowrap
  white-space nowrap
</style>
