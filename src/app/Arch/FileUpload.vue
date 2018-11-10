<template lang="pug">
  .file-upload
    v-btn.primary(
      ref="fileTextField"
      @click.native="onFocus"
      color="primary"
      ) Add image
      v-icon.ml-3 add_a_photo
    input(
      type="file"
      ref="fileInput"
      accept="image/x-png,image/jpeg"
      :multiple="multiple"
      :disabled="disabled"
      @change="onFileChange"
    )
</template>

<script>
  export default{
    sync: {
      model: {
        type: String | Array,
        required: true
      }
    },
    props: {
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      isBase64: {
        type: Boolean,
        default: true
      },
    },
    data: () => ({
      files: [],
      baseData: [],
      filename: ''
    }),
    methods: {
      onFocus () {
        if (!this.disabled) {
          this
            .$refs
            .fileInput
            .click()
        }
      },
      fileToBase64 (key) {
        const self = this
        self.model = []

        const reader = new FileReader()

        reader.onload = progress => {
          if (self.multiple) {
            self
              .model
              .push(reader.result)
          } else {
            self.model = reader.result
          }
          self.$emit('update:model', self.model)
        }

        reader.readAsDataURL(this.files[key])
      },
      onFileChange ($event) {
        const self = this

        const files = this.files = $event.target.files || $event.dataTransfer.files

        if (!files.length) {
          return
        }

        if (this.isBase64) {
          this
            .files = Object
            .keys(files)
            .map((key) => {
              self
                .fileToBase64(key)

              return self
                .files[key]
                .name
            })
          this.filename = (this.files && this.files.length > 0)
            ? this.files.join(', ')
            : $event.target.value.split('\\').pop()
          return
        }
        this.files = files
        this.filename = this.getNameOrFilesName(files)
        this.$emit('update:model', this.multiple ? files : files[0])
      },
      getNameOrFilesName (files) {
        let fileOrFilesName = ''
        for (let i = 0; i < files.length; i += 1) {
          fileOrFilesName += files[i].name + ', '
        }

        return fileOrFilesName.substring(0, fileOrFilesName.length - 2)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  input[type="file"]
    display none
</style>
