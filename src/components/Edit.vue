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
  <div class="row">
    <div class="col-6">
      <div class="row">
        <div class="col-4" v-for="img in place.images" :key="img">
          <img :src="img" alt="owo an image">
        </div>
      </div>

      <textarea @input="compile" :value="markdown" name="markdown" rows="10"></textarea>
    </div>

    <div class="col-6">
      <div v-html="compiled"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
textarea {
  width: 100%;
}
</style>
