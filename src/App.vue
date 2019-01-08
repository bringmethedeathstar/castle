<script>
import Top from "./components/Top";

export default {
  name: "app",
  components: {
    Top
  }
};
</script>

<template>
  <div id="app">
    <Top/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
