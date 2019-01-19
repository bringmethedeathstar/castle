<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      property: {}
    };
  },

  methods: {
    async fetch() {
      try {
        let res = await axios.get(
          ".netlify/functions/fetch?url=" + encodeURIComponent(this.url)
        );

        let data = res.data;

        let meta = JSON.parse(
          data.replace(/[\s\S]*}\('property',({.*})[\s\S]*/gm, "$1")
        );

        // this.property.title = data
        //   .replace(/[\s\S]*<.*itemprop="name".*>(.*)<\/.*>[\s\S]*/gm, "$1")
        //   .replace("to rent", "")
        //   .replace("to let", "");

        this.property.images = data
          .match(/<meta itemprop="contentUrl" content=".*" \/>/gm)
          .map(str =>
            str.replace(
              /<meta itemprop="contentUrl" content="(.*)" \/>/gm,
              "$1"
            )
          );

        this.property.description = data
          .replace(/\r?\n|\r/g, "")
          .replace(/[\s\S]*<p itemprop="description">(.*?)<\/p>[\s\S]*/gm, "$1")
          .replace(/^\s*/, "");

        this.property.address = data.replace(
          /[\s\S]*<meta itemprop="streetAddress" content="(.*)" \/>[\s\S]*/gm,
          "$1"
        );

        if (data.match(/no pets?|pets? not/i)) {
          this.property.pets = false;
        } else if (data.match(/pets? (considered|allowed|permitted|by)/i)) {
          this.property.pets = true;
        }

        this.property.propertyId = meta.propertyId;
        this.property.rooms = meta.propertyInfo.beds;
        this.property.price = meta.propertyInfo.price;
        this.property.postcode = meta.location.postcode;
        this.property.type = meta.propertyInfo.furnishedType;

        this.place(this.property);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },

    ...mapActions(["place"])
  },

  computed: mapState(["url"]),

  watch: {
    search: "fetch"
  },

  mounted() {
    this.fetch();
  }
};
</script>

<template>
  <div></div>
</template>
