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

    <h1>castle.</h1>

    <input type="text" placeholder="search me">
  </div>
</template>

<style lang="scss">
$black: #324048;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  padding: 30px;
  font-weight: bold;
}

input {
  width: 25vw;
  min-width: 330px;
  border: 0;
  border-bottom: 2px solid $black;
  padding: 10px 15px;
  text-align: center;
  font-weight: bold;

  &:focus {
    outline: none;
  }
}
</style>
