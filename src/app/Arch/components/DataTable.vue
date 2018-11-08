<template lang="pug">
  .data-table
    card-default
      v-card-title
        .titulo
          v-flex(xs5)
            lazy-text-field(:search-term.sync="searchTerm")
          v-btn(
            fab
            color="primary"
            dark
            small
            @click="novoRegistro()"
            v-if="!disableAdd"
          )
            v-icon add
        v-spacer
        v-spacer.hidden-sm-and-down
      v-data-table(
        :headers="headers"
        :items="items"
        hide-actions
        :search="searchTerm"
        :pagination.sync="pagination"
        :no-data-text="noResultsText"
        :no-results-text="noResultsText"
        :loading="true"
        color="primary"
      )
        template(
          slot="headers"
          slot-scope="props"
        )
          tr
            th.column.text-xs-left(
              :width="header.width"
              v-for="(header, key) in props.headers"
            )
              span {{ header.text }}
              v-icon(v-if="header.sortable") arrow_upward
        template(
          slot="items"
          slot-scope="props"
        )
          tr(:class="'row-' + props.item.id")
            td.cursor-pointer.text-xs-left(
              @click="goToEdit(props.item.id)"
              v-for="header in headers"
              v-if="header.type !== 'boolean' && header.type === 'date' && header.value !== 'acao'"
            ) {{ props.item[header.value] }}
            td.cursor-pointer.text-xs-left(
              @click="goToEdit(props.item.id)"
              v-for="header in headers"
              v-if="header.value === 'avatar' && header.type !== 'boolean' && header.type !== 'date' && header.value !== 'acao'"
              )
              v-avatar.my-2(:size="70")
                img(:src="props.item.avatar")
            td.cursor-pointer.text-xs-left(
              @click="goToEdit(props.item.id)"
              v-for="header in headers"
              v-if="header.value !== 'avatar' && header.type !== 'boolean' && header.type !== 'date' && header.value !== 'acao'"
            ) {{ getValue(props.item, header.value) }}
            td.cursor-pointer.text-xs-left(
              @click="goToEdit(props.item.id)"
              v-for="header in headers"
              v-if="header.type === 'boolean' && header.type !== 'date' && header.value !== 'acao'"
            )
              v-icon(
                color="green"
                v-if="props.item[header.value]"
              ) check
              v-icon(
                color="red"
                v-if="!props.item[header.value]"
              ) close
            td.cursor-pointer.text-xs-left
              v-tooltip(
                top
                v-if="!disableEdit"
              )
                v-btn.ma-0(
                  icon
                  flat
                  dark
                  color="grey darken-3"
                  small
                  @click="goToEdit(props.item.id)"
                  slot="activator"
                )
                  v-icon.grey--text.text--darken-2 edit
                span Editar
              v-tooltip(
                top
                v-if="!disableDelete"
              )
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
                span Deletar
    .text-xs-center.pt-1
      v-pagination(
        v-model="pagination.page"
        :length="pages"
      )
</template>

<script>
import LazyTextField from './LazyTextField'
import CardDefault from './CardDefault'
import Http from '@/app/Arch/Http'
import miniToastr from 'mini-toastr'

export default {
  components: {
    CardDefault,
    LazyTextField
  },
  props: {
    route: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    disableDelete: Boolean,
    disableAdd: Boolean,
    disableEdit: Boolean,
    backRoute: String,
    transformResponseData: Function,
    noResultsText: {
      type: String,
      default: 'Nenhum resultado encontrado'
    }
  },
  data: () => ({
    pagination: {},
    dialog: false,
    currentPage: 1,
    totalPages: 1,
    items: [],
    message: null,
    loading: false,
    searchTerm: ''
  }),
  computed: {
    pages () {
      const { pagination } = this
      if (pagination.rowsPerPage == null || pagination.totalItems == null) {
        return 0
      }

      return Math.ceil(pagination.totalItems / pagination.rowsPerPage)
    }
  },
  created () {
    this.mountedHeaderAcao()
    this.getData()
    miniToastr.init()
  },
  mounted () {
    document.addEventListener('scroll', this.hideTableAction, false)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.hideTableAction, false)
  },
  methods: {
    mountedHeaderAcao () {
      if (!this.disableEdit || !this.disableDelete) {
        const hasAcao = this.headers.find(header => header.value === 'acao')

        if (!hasAcao) {
          this.headers.push(
            { text: 'Ações', value: 'acao', align: 'left', sortable: false }
          )
        }
      }
    },
    getData () {
      this.loading = true

      Http
        .get(this.route)
        .then(({ data }) => {
          this.items = Object.assign([], data)
        })
    },
    novoRegistro () {
      this
        .$router
        .push(`${this.route}/new`)
    },
    deleteRow (id) {
      const options = {
        title: 'Atenção !!!',
        text: 'Tem certeza que deseja excluir este registro ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3e4094',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }

      this
        .$swal(options)
        .then((result) => {
          console.log(result.value)
          this.requestDelete(id)
        }, () => {})
    },
    requestDelete (id) {
      let url = `${this.route}/${id}`

      if (this.backRoute) {
        url = `${this.backRoute}/${id}`
      }

      Http
        .delete(url)
        .then(({ status }) => {
          if (status === 204) {
            throw Error('Houve um erro ao excluír o registro.')
          }
          miniToastr.success('Registro excluído com sucesso.', 'Sucesso!')
          this.getData()
        })
    },
    goToEdit (id) {
      this
        .$router
        .push(`${this.route}/edit/${id}`)
    },
    getValue (row, key) {
      key.split('.').map((index) => {
        row = row[index] || '-'
      })
      return row
    }
  }
}
</script>

<style lang="stylus" scoped>
$primaryColor = #2f3072
.headline
  padding-top 10px

.card
  .card__title
    flex-direction row

    @media screen and (max-width 600px)
      flex-direction column

.table-actions
  position absolute
  right 0
  top 0
  z-index 1

  @media screen and (max-width 600px)
    padding-top 10px

.titulo
  display flex
  justify-content space-between
  width 100%
</style>
