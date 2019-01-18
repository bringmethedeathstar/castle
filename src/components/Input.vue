<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      url: "https://www.rightmove.co.uk/property-to-rent/property-69395305.html"
    };
  },

  methods: {
    doSearch() {
      this.search(this.url);
    },

    ...mapActions(["search"])
  }
};
</script>

<template>
  <input type="text" placeholder="search me" v-model="url" @keyup.enter="doSearch">
</template>

<style lang="scss">
$accent: #bba3d0;

input {
  width: 25vw;
  min-width: 600px;
  border: 0;
  border-bottom: 2px dashed $accent;
  padding: 10px 15px;
  text-align: center;
  font-weight: bold;

  &:focus {
    outline: none;
  }
}
</style>
