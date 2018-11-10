<template lang="pug">
  card-default
    v-toolbar.elevation-1.py-2
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
          v-btn.primary Preview
        v-form(
          v-model="formValid"
          ref="form"
          lazy-validation
          )
          v-layout.mt-2(column align-center justify-center)
            v-flex(xs12 v-if="product.image")
              v-avatar(:size="300")
                v-img(
                  name="image"
                  id="image"
                  :src="product.image"
                )
            v-flex.mt-2(xs12)
              file-upload(
                name="image"
                id="image"
                :model.sync="product.image"
                )
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
          v-layout(row wrap)
            v-flex(xs12 sm6)
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
            v-flex(xs12 sm6)
              v-text-field(
                prefix="$"
                type="number"
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
          ) Cancel
          v-btn(
            color="primary"
            @click="save()"
          ) Save
</template>

<script>
import CardDefault from '@/app/Arch/components/CardDefault'
import FileUpload from '@/app/Arch/FileUpload'
import ProductService from './Service'
import CategoryService from '@/app/Category/Service'
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
    categories: [],
    uriImage: 'http://localhost:8081/products'
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
    getCategories () {
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
          this.product.image = `${this.uriImage}/${data.image}`
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
        .then(({ body }) => {
          this.successfullRequest('Product created successfully')
        })
        .catch(() => {
          if(!this.product.image) {
            return miniToastr.error('Required image', 'Error!!')
          }
          miniToastr.error('error', 'Error!!')
        })
    },
    editProduct () {
      ProductService
        .editProduct(this.id, this.product)
        .then(() => {
          this.successfullRequest('Product successfully edited')
        })
        .catch((response) => {
          console.log(response, 'edit')
          miniToastr.error('error', 'Error!!')
        })
    },
    successfullRequest (message) {
      miniToastr.success(message, 'Success!')
      this.goToBack()
    },
    goToBack () {
      this
        .$router
        .back()
    }
  }
}
</script>
