<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      address:
        "https://www.rightmove.co.uk/property-to-rent/property-69395305.html"
    };
  },

  methods: {
    search() {
      // set address in store
      this.setAddress(this.address);

      // get Host from address
      this.setHost(
        this.address
          .replace(/.*:\/\//, "")
          .replace("www.", "")
          .split(".")[0]
      );
    },

    ...mapMutations(["setAddress", "setHost"])
  }
};
</script>

<template>
  <input type="text" placeholder="search me" v-model="address" @keyup.enter="search">
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
