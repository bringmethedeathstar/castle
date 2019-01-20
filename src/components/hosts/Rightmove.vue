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
          .replace(/^\s*/, "")
          .replace(/<br\s?\/?>/g, "\n\n")
          .replace(/<strong>(.*)<\/strong>/g, "**$1**");

        this.property.address = data.replace(
          /[\s\S]*<meta itemprop="streetAddress" content="(.*)" \/>[\s\S]*/gm,
          "$1"
        );

        this.property.number = this.property.address.replace(
          /(.+?),? .*/,
          "$1"
        );

        this.property.pets = "idk";

        if (data.match(/no pets?|pets? not/i)) {
          this.property.pets = false;
        } else if (
          data.match(/pets? (considered|allowed|permitted|welcome|by)/i)
        ) {
          this.property.pets = true;
        }

        this.property.propertyId = meta.propertyId;
        this.property.rooms = meta.propertyInfo.beds;
        this.property.price = meta.propertyInfo.price;
        this.property.postcode = meta.location.postcode;
        this.property.type = meta.propertyInfo.furnishedType;

        let url = `http://www.mycounciltax.org.uk/results?postcode=${
          this.property.postcode
        }`;

        let q = await axios({ params: { url } });
        let r = /<td( align="center")?>(.+?)<\/td>/g;
        let tax = q.data
          .replace(/\r?\n|\r/g, "")
          .match(/<tr>.+?<\/tr>/g)
          .map(row => {
            let match = row.match(r);

            if (match) {
              return match.map(col =>
                col
                  .replace(r, "$2")
                  .replace(/^\s|\s$/g, "")
                  .replace("&pound;", "")
              );
            }
          })
          .filter(t => typeof t !== "undefined")
          .map(item => ({
            number: item[0].replace(/(.+?),.*/, "$1"),
            address: item[0],
            band: item[1],
            year: parseInt(item[2]),
            month: Math.ceil(item[2] / 10)
          }));

        this.tax(tax);
        this.place(this.property);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },

    ...mapActions(["place", "tax"])
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
