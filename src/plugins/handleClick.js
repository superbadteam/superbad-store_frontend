const touchOutSide = {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    // prevent first click
    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent)
    }, 0)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
export default {
  install: (app) => {
    app.directive('touch-outside', touchOutSide)
  },
}
