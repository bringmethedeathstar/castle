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
$black: #324048;

input {
  width: 25vw;
  min-width: 330px;
  border: 0;
  border-bottom: 2px solid $black;
  padding: 10px 15px;
  text-align: center;
  font-weight: bold;

  &:focus {
    outline: none;
  }
}
</style>
