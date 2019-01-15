<script>
import { mapState } from "vuex";

import Float from "@/components/Float";
import Input from "@/components/Input";
import Host from "@/components/Host";
import Wait from "@/components/Wait";
import Edit from "@/components/Edit";

export default {
  components: {
    Float,
    Input,
    Host,
    Wait,
    Edit
  },

  computed: mapState(["mode"])
};
</script>

<template>
  <div id="castle">
    <Wait v-if="mode === 'wait'"/>

    <Edit v-if="mode === 'edit'"/>

    <template v-else>
      <Float/>

      <h1>castle.</h1>

      <Input/>

      <Host/>
    </template>
  </div>
</template>

<style lang="scss">
$black: #324048;

#castle {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  padding: 30px;
  font-weight: bold;
}
</style>
