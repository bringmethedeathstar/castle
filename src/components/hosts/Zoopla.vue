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
          data
            .replace(/\r?\n|\r/g, "")
            .replace(/[\s\S]*ZPG\.trackData\.taxonomy = (.*?);[\s\S]*/, "$1")
            .replace(/\s\s+/g, " ")
            .replace(/(\S+):\s/gm, '"$1": ')
        );

        this.property.images = data
          .match(/<img src=".*" class="dp-gallery__image" alt=".*">/gm)
          .map(str =>
            str.replace(
              /<img src="(.*)" class="dp-gallery__image" alt=".*">/gm,
              "$1"
            )
          );

        this.property.description = data
          .replace(/\r?\n|\r/g, "")
          .replace(
            /[\s\S]*<div class="dp-description__text">(.*?)<\/div>[\s\S]*/gm,
            "$1"
          )
          .replace(/^\s*/, "")
          .replace(/<br\s?\/?>/g, "\n\n")
          .replace(/<strong>(.*)<\/strong>/g, "**$1**");

        this.property.pets = "idk";

        if (data.match(/no pets?|pets? not/i)) {
          this.property.pets = false;
        } else if (
          data.match(/pets? (considered|allowed|permitted|welcome|by)/i)
        ) {
          this.property.pets = true;
        }

        this.property.address = meta.display_address;
        this.property.propertyId = meta.listing_id;
        this.property.rooms = meta.num_beds;
        this.property.price = meta.price;
        // this.property.postcode = meta.location.postcode;
        this.property.type = meta.furnished_state;

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
