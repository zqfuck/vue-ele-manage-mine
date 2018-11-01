<template>
  <div id="app" >
    <router-view v-wechat-title="this.$route.meta[1]" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
