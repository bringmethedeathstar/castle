<script>
import { mapState } from "vuex";
import axios from "axios";

import Rightmove from "@/components/hosts/Rightmove";

export default {
  components: {
    Rightmove
  },

  methods: {
    async fetch() {
      let res = await axios.get(
        "http://api.allorigins.ml/get?url=" + encodeURIComponent(this.address)
      );

      console.log(res.data.contents.match(/<body[^>]*>[\s\S]*<\/body>/gi));
    }
  },

  computed: mapState(["host", "address"]),

  watch: {
    address: "fetch"
  }
};
</script>

<template>
  <component v-if="host" :is="host"></component>
</template>

<style lang="scss">
</style>
