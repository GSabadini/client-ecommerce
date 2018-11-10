<template lang="pug">
  card-default
    v-toolbar.elevation-0.card-title
      v-btn(icon
        @click="goToBack()"
      )
        v-icon keyboard_backspace
      v-toolbar-title {{ title }}
      v-spacer
    v-divider
    v-card-text.pt-2.pb-2
      v-container(grid-list-lg)
        v-layout(row)
          v-spacer
          v-btn.primary(
          ) Preview
        v-form(
          v-model="formValid"
          ref="form"
          lazy-validation
          )
          v-layout(column align-center justify-center)
            v-flex(xs12)
              v-avatar(:size="150")
                v-img(
                  name="image"
                  id="image"
                  :src="product.image"
                )
            v-flex(xs12)
              file-upload
          v-layout.mt-2(row)
            v-flex(xs12)
              v-text-field(
                name="name"
                label="Name"
                id="name"
                :rules="inputRules"
                v-model="product.name"
                required
              )
          v-layout(row)
            v-flex(xs12)
              v-textarea(
                name="description"
                label="Description"
                id="description"
                :rules="inputRules"
                v-model="product.description"
                required
              )
          v-layout(row)
            v-flex(xs6)
              v-select(
                name="category_id"
                label="Categories"
                id="category_id"
                :items="categories"
                item-text="name"
                item-value="id"
                :rules="inputRules"
                v-model="product.category_id"
                required
              )
            v-flex(xs6)
              v-text-field(
                name="price"
                label="Price"
                id="price"
                :rules="inputRules"
                v-model="product.price"
                required
              )
        v-layout.mt-5(row)
          v-spacer
          v-btn(
            @click="goToBack()"
          ) Cancelar
          v-btn(
            color="primary"
            @click="save()"
          ) Salvar
</template>

<script>
import CardDefault from '@/app/Arch/components/CardDefault'
import FileUpload from '@/app/Arch/FileUpload'
import ProductService from './ProductService'
import CategoryService from '@/app/Category/CategoryService'
import miniToastr from 'mini-toastr'

export default {
  name: 'product-form',
  components: {
    CardDefault,
    FileUpload
  },
  data: () => ({
    title: 'New product',
    id: null,
    product: {},
    inputRules: [
      (v) => !!v || 'Filling in this field is required.'
    ],
    formValid: false,
    categories: []
  }),
  computed: {
    verifyIdExist () {
      return !!this.id
    },
    isValidForm () {
      return this
        .$refs
        .form
        .validate()
    }
  },
  created () {
    const { id: idParams } = this.$route.params
    this.id = idParams

    if (this.id) {
      this.getProductId()
    }

    this.getCategories()
    miniToastr.init()
  },
  methods: {
    goToBack () {
      this
        .$router
        .push('/products')
    },
    getCategories() {
      CategoryService
        .getCategories()
        .then(({ data }) => {
          this.categories = data
        })
    },
    getProductId () {
      ProductService
        .getProductId(this.id)
        .then(({ data }) => {
          this.product = data
          this.title = `Editar ${data.name}`
        })
    },
    save () {
      if (!this.isValidForm) {
        return
      }

      if (this.verifyIdExist) {
        return this.editProduct()
      }

      return this.newProduct()
    },
    newProduct () {
      ProductService
        .newProduct(this.product)
        .then(() => {
          this.successfullRequest('Product created successfully')
        })
        .catch(({ body }) => {
          miniToastr.error(body, 'Error!!')
        })
    },
    editProduct () {
      ProductService
        .editProduct(this.id, this.product)
        .then(() => {
          this.successfullRequest('Product successfully edited')
        })
        .catch(({ body }) => {
          miniToastr.error(body, 'Error!!')
        })
    },
    successfullRequest (message) {
      miniToastr.success(message, 'Success!')
      this.goToBack()
    }
  }
}
</script>
