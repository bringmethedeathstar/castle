<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      place: {}
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

        this.place.title = data
          .replace(/[\s\S]*<.*itemprop="name".*>(.*)<\/.*>[\s\S]*/gm, "$1")
          .replace("to rent", "")
          .replace("to let", "");

        this.place.address = data.replace(
          /[\s\S]*<meta itemprop="streetAddress" content="(.*)" \/>[\s\S]*/gm,
          "$1"
        );

        if (data.match(/no pets|pets not/i)) {
          this.place.pets = false;
        } else if (
          data.match(/pets considered|pets allowed|pets permitted|pets by/i)
        ) {
          this.place.pets = true;
        }

        this.place.propertyId = meta.propertyId;
        this.place.rooms = meta.propertyInfo.beds;
        this.place.price = meta.propertyInfo.price;
        this.place.postcode = meta.location.postcode;
        this.place.type = meta.propertyInfo.furnishedType;

        this.setPlace(this.place);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },

    ...mapMutations(["setPlace"])
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

<style lang="scss">
</style>
