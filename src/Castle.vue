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
    <div class="casle-contain">
      <Wait v-if="mode === 'wait'"/>

      <Edit v-if="mode === 'edit'"/>

      <template v-else>
        <Float/>

        <h1>castle.</h1>

        <Input/>

        <Host/>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap-reboot.scss";
@import "~bootstrap/scss/bootstrap-grid.scss";

$black: #324048;
$accent: #bba3d0;

#castle {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  font-weight: bold;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.casle-contain {
  padding: 30px;
}

img {
  width: 100%;
}
</style>
