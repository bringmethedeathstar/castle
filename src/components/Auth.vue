<script>
export default {
  data() {
    return {};
  },

  mounted() {
    Trello.authorize({
      type: "popup",
      name: "🏰 Castle",
      scope: {
        read: "true",
        write: "true"
      },
      expiration: "never",
      success() {
        console.log("Trello Authorized 👍🏻");
      },
      error(e) {
        console.log("Oh heck 👎🏻");
        console.error(e);
      }
    });
  }
};
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
</style>
