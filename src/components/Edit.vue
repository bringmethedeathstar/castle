<script>
import { mapState } from "vuex";
import marked from "marked";
import autosize from "autosize";

export default {
  data() {
    return {
      markdown: "",
      pets: false,
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
      this.grow();
    },

    grow() {
      console.log("grow");

      autosize.update(this.$refs.markdown);
    }
  },

  mounted() {
    this.pets = this.place.pets;

    this.title = `£${this.place.price} - ${this.place.address}`;

    this.image = this.place.images[0];

    // need to tidy this
    this.markdown = `**Price:** £${this.place.price}\n\n**Bedrooms:** ${
      this.place.rooms
    }\n\n**Address:** ${this.place.address}, ${
      this.place.postcode
    }\n\n### Description\n${this.place.description}`;

    autosize(this.$refs.markdown);
  }
};
</script>

<template>
  <div class="row justify-content-between">
    <div class="col-6">
      <div class="row">
        <div class="col-4" v-for="img in place.images" :key="img">
          <img
            @click="image = img"
            class="image-select"
            :class="{ active: image == img }"
            :src="img"
            alt="owo an image"
          >
        </div>
      </div>

      <div class="pets" @click="pets = !pets">
        <template v-if="pets">
          <span>😻</span> - pets considered
        </template>

        <template v-else>
          <span>😿</span> - no pets
        </template>
      </div>

      <input type="text" v-model="title">
      
      <textarea
        ref="markdown"
        @input="compile"
        @focus.once="grow"
        :value="markdown"
        name="markdown"
      ></textarea>
    </div>

    <div class="col">
      <div class="split"></div>
    </div>

    <div class="trello-contain">
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
$accent: #bba3d0;

.image-select {
  margin-bottom: 30px;
  cursor: pointer;
  border: 2px dashed transparent;
  transition: border-color 0.3s;

  &.active {
    border-color: $accent;
  }
}

.pets {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
  text-align: left;
  user-select: none;

  span {
    font-size: 26px;
    margin-right: 5px;
    margin-bottom: -5px;
  }
}

input,
textarea {
  width: 100%;
  border: 2px dashed $accent;
  padding: 15px;
  text-align-last: left;
  margin-bottom: 30px;

  &:focus {
    outline: none;
  }
}

textarea {
  margin-bottom: 0;
  min-height: 330px;
}

.split {
  width: 1px;
  height: calc(100% + 60px);
  margin: -30px auto;
  border-left: 1px dashed $accent;
}

.trello-contain {
  flex: 0 0 400px;
  width: 400px;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  position: relative;
}

.trello-card {
  width: 370px;
  position: fixed;
  border-radius: 2px;
  background-color: #ebeef0;
  color: #17394d;
  font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  top: 50%;
  transform: translateY(-50%);

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
}

.trello-body {
  text-align: left;
  padding: 20px 40px;
  max-height: 300px;
  overflow: scroll;
}
</style>
