<template>
  <div class="fadeIn w-screen h-screen fixed top-0 left-0 z-[60] flex justify-center items-center bg-[#e8e8e8b0]">
    <div class="flex flex-col gap-5 justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24">
        <defs>
          <filter id="svgSpinnersGooeyBalls20">
            <feGaussianBlur in="SourceGraphic" result="y" stdDeviation="1" />
            <feColorMatrix in="y" result="z" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
            <feBlend in="SourceGraphic" in2="z" />
          </filter>
        </defs>
        <g filter="url(#svgSpinnersGooeyBalls20)">
          <circle cx="5" cy="12" r="4" fill="#5a4098">
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2s"
              keySplines=".36,.62,.43,.99;.79,0,.58,.57"
              repeatCount="indefinite"
              values="5;8;5"
            />
          </circle>
          <circle cx="19" cy="12" r="4" fill="#ff5353">
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2s"
              keySplines=".36,.62,.43,.99;.79,0,.58,.57"
              repeatCount="indefinite"
              values="19;16;19"
            />
          </circle>
          <animateTransform
            attributeName="transform"
            dur="0.75s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </g>
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
