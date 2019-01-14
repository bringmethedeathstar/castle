<script>
import { mapState } from "vuex";

import Rightmove from "@/components/hosts/Rightmove";

export default {
  components: {
    Rightmove
  },

  computed: mapState(["host"])
};
</script>

<template>
  <component v-if="host" :is="host"></component>
</template>

<style lang="scss">
</style>
