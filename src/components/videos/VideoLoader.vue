<script setup>
import { computed, onBeforeMount } from 'vue'
const width = computed(() => {
  return (window.innerWidth * 70) / 100
})
const height = computed(() => {
  return (window.innerHeight * 70) / 100
})
onBeforeMount(() => {
  initYoutubeScript()
})
const initYoutubeScript = () => {
  let tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  tag.id = 'youtube-iframe-api'
  tag.async = true
  document.body.appendChild(tag)
  tag.onload = () => {
    window.YT.ready(() => {
      onYouTubeIframeAPIReady()
    })
  }
}
const onYouTubeIframeAPIReady = () => {
  new window.YT.Player('player', {
    width: width.value,
    height: height.value,
    videoId: 'bkif99weCpo',
    playerVars: {
      playsinline: 1,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}
const onPlayerReady = (event) => {
  event.target.playVideo()
}
const onPlayerStateChange = (event) => {
  console.log(event)
}
</script>
<template>
  <div id="player"></div>
  <!-- <VueVideoPlayer
    src="https://vjs.zencdn.net/v/oceans.mp4"
    poster="https://variety.com/wp-content/uploads/2020/05/hulu-watch-party-interface.jpg?w=1000&h=563&crop=1&resize=1000%2C563"
    controls
    :loop="true"
    :volume="0.6"
    :width="width"
  /> -->
  <!-- <img
      src="https://variety.com/wp-content/uploads/2020/05/hulu-watch-party-interface.jpg?w=1000&h=563&crop=1&resize=1000%2C563"
      alt=""
    /> -->
</template>
