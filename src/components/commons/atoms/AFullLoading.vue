<template>
  <div class="fadeIn w-screen h-screen fixed top-0 left-0 z-[999] flex justify-center items-center bg-[#e8e8e8b0]">
    <div class="flex flex-col gap-5 justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="0" fill="#5145e5">
          <animate
            id="svgSpinnersPulse20"
            fill="freeze"
            attributeName="r"
            begin="0;svgSpinnersPulse21.begin+0.6s"
            calcMode="spline"
            dur="1.2s"
            keySplines=".52,.6,.25,.99"
            values="0;11"
          />
          <animate
            fill="freeze"
            attributeName="opacity"
            begin="0;svgSpinnersPulse21.begin+0.6s"
            calcMode="spline"
            dur="1.2s"
            keySplines=".52,.6,.25,.99"
            values="1;0"
          />
        </circle>
        <circle cx="12" cy="12" r="0" fill="#5145e5">
          <animate
            id="svgSpinnersPulse21"
            fill="freeze"
            attributeName="r"
            begin="svgSpinnersPulse20.begin+0.6s"
            calcMode="spline"
            dur="1.2s"
            keySplines=".52,.6,.25,.99"
            values="0;11"
          />
          <animate
            fill="freeze"
            attributeName="opacity"
            begin="svgSpinnersPulse20.begin+0.6s"
            calcMode="spline"
            dur="1.2s"
            keySplines=".52,.6,.25,.99"
            values="1;0"
          />
        </circle>
      </svg>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style scoped>
.fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
