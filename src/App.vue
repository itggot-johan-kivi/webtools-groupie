<template>
  <div id="app">

  <transition name="fade">
    <overlay v-if="showOverlay"/>
  </transition>

  <transition name="fade">
    <router-view/>
  </transition>

  </div>
</template>

<script>


import overlay from '@/components/Groups'

export default {
  name: 'app',
  data(){
    return {}
  },
  computed: {
    showOverlay(){ 
      return this.$store.state.showGroups;
    }
  },
  components: {
    overlay
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>
