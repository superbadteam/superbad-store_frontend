<script setup>
import { ref } from 'vue'
import vueFilePond from 'vue-filepond'

const emits = defineEmits(['update:modelValue'])
defineProps({
  allowMultiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array || Object,
    default: null,
  },
})
// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import '@/assets/css/filepond.css'
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
const myFiles = ref([])
const handleFilePondInit = () => {
  console.log('FilePond has initialized')

  // example of instance method call on pond reference
  pond.value.getFiles()
}
const filesChange = () => {
  console.log('in filechange')

  var files = pond.value.getFiles()
  emits('update:modelValue', files)
  for (var i = 0; i < files.length; i++) {
    console.log(files[i].file)
  }
}
const pond = ref(null)
</script>
<template>
  <div id="app">
    <file-pond
      ref="pond"
      name="test"
      label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
      :allow-multiple="allowMultiple"
      accepted-file-types="image/jpeg, image/png"
      :files="myFiles"
      credits="false"
      @init="handleFilePondInit"
      @addfile="filesChange"
    />
  </div>
</template>
