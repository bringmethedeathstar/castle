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

      //itemprop="name"
      //itemprop="streetAddress"
      //id="propertyHeaderPrice"

      // <.*itemprop="<thing>".*>([\s\S])</.*>

      console.log(res.data.contents.match(/<body[^>]*>[\s\S]*<\/body>/gi));

      console.log(
        "title: ",
        res.data.contents.replace(
          /[\s\S]*<.*itemprop="name".*>(.*)<\/.*>[\s\S]*/gm,
          "$1"
        )
      );

      console.log(
        "address: ",
        res.data.contents.replace(
          /[\s\S]*<meta itemprop="streetAddress" content="(.*)" \/>[\s\S]*/gm,
          "$1"
        )
      );

      let data = JSON.parse(
        res.data.contents.replace(/[\s\S]*}\('property',({.*})[\s\S]*/gm, "$1")
      );

      // console.log(data);

      console.log("postcode: ", data.location.postcode);
      console.log("price: £", data.propertyInfo.price);
      console.log("bedrooms: ", data.propertyInfo.beds);
      console.log("furnished type: ", data.propertyInfo.furnishedType);
      console.log("propertyId: ", data.propertyId);
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
