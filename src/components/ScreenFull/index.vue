<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
// import ScreenFull from 'screenfull'
export default {
  data() {
    return {
      fullScreen: false
    }
  },
  methods: {
    //   改变全屏
    changeScreen() {
      if (!this.fullScreen) {
        // 非全屏状态
        this.fullScreen = true
        document.documentElement.requestFullscreen()
      } else {
        // 全屏状态
        this.fullScreen = false
        document.exitFullscreen()
      }
    }
  }
}
</script>

<style>
</style>
