<script>
import Float from "./components/Float";

export default {
  name: "app",
  components: {
    Float
  }
};
</script>

<template>
  <div id="app">
    <Float/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
