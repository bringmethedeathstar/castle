<script>
import Float from "./components/Float";
import Input from "./components/Input";

export default {
  name: "app",

  components: {
    Float,
    Input
  }
};
</script>

<template>
  <div id="app">
    <Float/>

    <h1>castle.</h1>

    <Input/>
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
</style>
