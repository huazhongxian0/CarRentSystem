<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  updated () {
    window.history.pushState(null, null, window.location.href)
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

nav {
  padding: 0px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0;
  padding: 0;
    &.router-link-exact-active {
      color: #42b983;
        margin: 0;
  padding: 0;
    }
  }
}
</style>
