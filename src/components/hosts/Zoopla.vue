<script>
import { mapState, mapActions } from "vuex";
import axios from "@/plugins/axios";

export default {
  data() {
    return {
      property: {}
    };
  },

  methods: {
    async fetch() {
      try {
        let res = await axios({
          params: { url: this.url }
        });

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
        this.property.postcode = meta.outcode;
        this.property.type = meta.furnished_state;
        this.property.number = 0;

        let monthly = data.replace(/[\s\S]*name: 'council_tax',\s+value: Math\.round\( (\d+) \)[\s\S]*/, '$1');

        let tax = {
          number: 0,
          address: this.property.address,
          band: data.replace(/[\s\S]*Council tax band (.)[\s\S]*/, '$1'),
          year: monthly * 10,
          month: parseInt(monthly),
        }

        this.tax([tax]);

        this.place(this.property);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },

    ...mapActions(["place", 'tax'])
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
