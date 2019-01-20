<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      allow: ["rightmove", "zoopla"],
      error: false,
      url: "https://www.rightmove.co.uk/property-to-rent/property-69395305.html"
      // url: "https://www.zoopla.co.uk/to-rent/details/50175206"
      // url: "https://www.primelocation.com/to-rent/details/50121940"
    };
  },

  methods: {
    doSearch() {
      this.error = false;

      let host = this.url
        .replace(/.*:\/\//, "")
        .replace("www.", "")
        .split(".")[0];

      if (this.allow.includes(host)) {
        this.search({ url: this.url, host });
      } else {
        this.error = `${host} not supported yet`;
      }
    },

    ...mapActions(["search"])
  }
};
</script>

<template>
  <div>
    <input type="text" placeholder="search me" v-model="url" @keyup.enter="doSearch">

    <div class="emoji-text error" :class="{ active: error }">
      <span>🤕</span>
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
$accent: #bba3d0;

input {
  width: 25vw;
  min-width: 600px;
  border: 0;
  border-bottom: 2px dashed $accent;
  padding: 10px 15px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;

  &:focus {
    outline: none;
  }
}

.error {
  justify-content: center;
  font-size: 12px;
  opacity: 0;
  color: tomato;

  &.active {
    opacity: 1;
  }
}
</style>
