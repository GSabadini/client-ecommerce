<template lang="pug">
  .file-upload
    input.dontshow(
      type="file"
      ref="fileInput"
      :multiple="multiple"
      accept="image/x-png,image/gif,image/jpeg"
      @change="onFileSelected"
      )
    v-layout(justify-center)
      v-dialog(v-model="dialog" persistent max-width="350")
        v-flex(xs12)
          v-card(color="info")
            v-card-title.title Tem certeza que deseja inserir esse arquivo?
            v-spacer
              v-layout(row justify-center)
                v-btn(color="success" @click="onUpload") Sim
                v-btn(color="error" @click.stop="onDialog") Não
      v-btn.primary(@click="onInput" color="primary" block slot="activator") Escolha as Imagens
        v-icon.ml-3 add_a_photo
</template>

<script>
import http from './Http'

export default {
  name: 'FileUpload',
  props: ['img', 'multiple'],
  data: () => ({
    uploadedFiles: [],
    selectedFile: [],
    dialog: false
  }),
  methods: {
    onDialog(dialog) {
      this.dialog = !dialog
    },
    onInput() {
      this.$refs.fileInput.click()
    },
    onFileSelected(event) {
      this.dialog = true
      this.selectedFile = event.target.files
    },
    onUpload() {
      Array.prototype.forEach.call(this.selectedFile, (file, index) => {
        const fd = new FormData()
        fd.append('file', file, file.name)

        http
          .post('/file-upload', fd)
          .then(({ data }) => {
            this.uploadedFiles.push({
              imgSource: data,
              principal: index === 0
            })
          })
      })

      this.$emit('update:img', this.uploadedFiles)

      this.dialog = false
    }
  }
}
</script>

<style lang="stylus">
.dontshow
  display none
</style>
