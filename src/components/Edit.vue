<script>
import { mapState, mapActions } from "vuex";
import marked from "marked";

export default {
  data() {
    return {
      markdown: "### Description"
    };
  },

  computed: {
    compiled() {
      return marked(this.markdown, { sanitize: true });
    },

    ...mapState(["place"])
  },

  methods: {
    compile(e) {
      this.markdown = e.target.value;
    }
  }
};
</script>

<template>
  <div>
    <textarea @input="compile" :value="markdown" name="markdown" rows="10"></textarea>

    <hr>

    <div v-html="compiled"></div>
  </div>
</template>

<style lang="scss" scoped>
</style>
