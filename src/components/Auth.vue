<script>
import { mapActions } from "vuex";

export default {
  methods: {
    auth() {
      let castle = this;

      Trello.authorize({
        type: "popup",
        name: "🏰 Castle",
        scope: { read: "true", write: "true" },
        expiration: "never",
        success() {
          console.log("Trello Authorized 👍🏻");

          castle.token();
        },
        error(e) {
          console.error(e);
        }
      });
    },

    ...mapActions(["token"])
  },

  mounted() {
    this.auth();
  }
};
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
</style>
