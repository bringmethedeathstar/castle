<script>
import { mapState, mapActions } from "vuex";
import marked from "marked";

export default {
  data() {
    return {
      markdown: "",
      image: "",
      title: ""
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
  },

  mounted() {
    this.title = `£${this.place.price} - ${this.place.address}`;

    this.image = this.place.images[0];

    // need to tidy this
    this.markdown = `### Description\n${
      this.place.description
    }\n\n**Address:** ${this.place.address}, ${
      this.place.postcode
    }\n\n**Price:** £${this.place.price}\n\n**Bedrooms:** ${this.place.rooms}`;
  }
};
</script>

<template>
  <div class="row justify-content-between">
    <div class="col-6">
      <div class="row">
        <div class="col-4" v-for="img in place.images" :key="img">
          <img @click="image = img" class="image-select" :src="img" alt="owo an image">
        </div>
      </div>

      <input type="text" v-model="title">
      
      <textarea @input="compile" :value="markdown" name="markdown" rows="10"></textarea>
    </div>

    <div class="col-2">
      <div class="split"></div>
    </div>

    <div class="col-4">
      <div class="trello-card">
        <img :src="image" alt="owo an image">

        <div class="trello-body">
          <h1>{{ title }}</h1>
          <div v-html="compiled"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-select {
  margin-bottom: 30px;
  cursor: pointer;
}

input,
textarea {
  width: 100%;
  border: 2px dashed #ebeef0;
  padding: 15px;
  text-align-last: left;
  margin-bottom: 30px;
}

.split {
  width: 1px;
  height: 100%;
  background-color: #ebeef0;
  margin: 0 auto;
}

.trello-card {
  border-radius: 2px;
  background-color: #ebeef0;
  color: #17394d;
  font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
}

.trello-body {
  text-align: left;
  padding: 20px 40px;
}
</style>
