<template>
<div id="app">
  <div id="game">
    <Game />
  </div>
  <div id="border" />
  <div id="input">
    <Chat />
  </div>
</div>
</template>

<script>
import Chat from './components/Chat.vue';
import Game from './components/Game.vue';

export default {
  name: 'App',
  components: {
    Game,
    Chat,
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  text-align: left;
  background-color: black;
}
#game {
  width: 100vw;
  height: 100vh;
}

#input {
  width: 30vw;
  height: 100vh;
}

#border {
  border-right: 2px solid cyan

}

/* Alt Style */
@media (max-width: 1000px) {
  #app {
    flex-direction: column;
  }
  #input {
    width: 100vw;
    height: 50vh;
  }
  #game {
    width: 100vw;
    height: 50vh;
  }
}
</style>
