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
        v-form(
          v-model="formValid"
          ref="form"
          lazy-validation
          )
          v-layout(column align-center justify-center)
            v-flex(xs12)
              v-avatar(:size="150")
                v-img(
                  name="avatar"
                  label="Avatar"
                  id="avatar"
                  :src="example.avatar"
                )
          v-layout.mt-2(row)
            v-flex(xs12)
              v-text-field(
                name="name"
                label="Nome"
                id="name"
                :rules="inputRules"
                v-model="example.name"
                required
              )
        v-layout(row)
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
import ProductService from './ProductService'
import miniToastr from 'mini-toastr'

export default {
  components: {
    CardDefault
  },
  data: () => ({
    title: 'New product',
    id: null,
    example: {},
    inputRules: [
      (v) => !!v || 'Filling in this field is required.'
    ],
    formValid: false
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
      this.getData()
    }

    miniToastr.init()
  },
  methods: {
    getExampleInService () {
      ProductService
        .getExample()
        .then(({ data }) => {
          console.log('b', data)
        })
    },
    goToBack () {
      this
        .$router
        .push('/examples')
    },
    getData () {
      ProductService
        .getExampleId(this.id)
        .then(({ data }) => {
          this.example = data
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
        .newProduct(this.example)
        .then(() => {
          this.successfullRequest('Example cadastrado com sucesso')
        })
        .catch(({ body }) => {
          miniToastr.error(body, 'Erro!!')
        })
    },
    editProduct () {
      ProductService
        .editProduct(this.id, this.example)
        .then(() => {
          this.successfullRequest('Example alterado com sucesso')
        })
        .catch(({ body }) => {
          miniToastr.error(body, 'Erro!!')
        })
    },
    successfullRequest (message) {
      miniToastr.success(message, 'Sucesso!')
      this.goToBack()
    }
  }
}
</script>
