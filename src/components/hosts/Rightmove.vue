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
          "http://api.allorigins.ml/get?url=" + encodeURIComponent(this.url)
        );

        let data = res.data.contents;

        let meta = JSON.parse(
          data.replace(/[\s\S]*}\('property',({.*})[\s\S]*/gm, "$1")
        );

        this.property.title = data
          .replace(/[\s\S]*<.*itemprop="name".*>(.*)<\/.*>[\s\S]*/gm, "$1")
          .replace("to rent", "")
          .replace("to let", "");

        this.property.description = data.replace(
          /[\s\S]*<.*itemprop="description".*>(.*)<\/.*>[\s\S]*/gm,
          "$1"
        );

        this.property.address = data.replace(
          /[\s\S]*<meta itemprop="streetAddress" content="(.*)" \/>[\s\S]*/gm,
          "$1"
        );

        if (data.match(/no pets|pets not/i)) {
          this.property.pets = false;
        } else if (
          data.match(/pets considered|pets allowed|pets permitted|pets by/i)
        ) {
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

<template></template>
