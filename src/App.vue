<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    Game: () => import('./components/Game.vue')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
