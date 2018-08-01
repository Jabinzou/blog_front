<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut faster">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
