import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', () => {
  const state = ref({
    isShow: false,
    content: '',
    type: 'Confirm',
    onConfirm: null,
    onClose: null,
    isAsync: false,
    isProcessing: false,
  })

  const showPopup = ({ content, isAsync, type, onConfirm, onClose }) => {
    state.value.isShow = true
    state.value.content = content
    state.value.type = type
    state.value.onConfirm = onConfirm
    state.value.onClose = onClose
    state.value.isAsync = isAsync
  }

  const confirm = async () => {
    if (state.value.onConfirm) {
      if (state.value.isAsync) {
        state.value.isProcessing = true
        try {
          await state.value.onConfirm()
        } catch (error) {
          console.log(error)
        } finally {
          state.value.isProcessing = false
        }
      } else {
        state.value.onConfirm()
      }
    }
    hidePopup()
  }

  const close = () => {
    if (state.value.onClose) {
      state.value.onClose()
    }
    hidePopup()
  }

  const hidePopup = () => {
    state.value.isShow = false
    state.value.content = ''
    state.value.type = 'Confirm'
    state.value.callback = null
    state.value.isAsync = false
  }

  return {
    state,
    showPopup,
    hidePopup,
    confirm,
    close,
  }
})
