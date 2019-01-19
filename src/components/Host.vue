<script>
import { mapState } from "vuex";

import Rightmove from "@/components/hosts/Rightmove";
import Zoopla from "@/components/hosts/Zoopla";

export default {
  components: {
    Rightmove,
    Zoopla
  },

  computed: mapState(["host"])
};
</script>

<template>
  <component v-if="host" :is="host"></component>
</template>

