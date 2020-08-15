<template>
  <div id="app">
    <Taskbar/>
    <Body/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Taskbar from './components/Taskbar'
import Body from './components/Body'

export default {
  name: 'App',
  components: {
    Taskbar,
    Body
  }
}
</script>

<style>
#app {
  display: grid;
  grid-template-columns: repeat(12,ifr);
  height: 100vh;
  overflow-y: hidden;
}
</style>
