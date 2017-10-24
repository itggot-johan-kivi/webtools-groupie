<template>
  <div id="app">
    <wtmenu/>
    <router-view/>
  </div>
</template>

<script>

import wtmenu from '@/components/Menu'

export default {
  name: 'app',
  components: {
    wtmenu
  }
}
</script>

<style>
body, html {
    margin: 0;
    width: 100vw;
    height: 100vh;
}

#app {
    margin: 0;
    font-family: 'Fira Sans';
    font-weight: 400;
    font-style: normal;
    font-size: .9em;
    background: #eee;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
}
</style>
