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
      title: "",
      band: {}
    };
  },

  computed: {
    compiled() {
      return marked(this.markdown, { sanitize: true });
    },

    ...mapState(["place", "tax"])
  },

  methods: {
    compile(e) {
      this.markdown = e.target.value;
      this.grow();
    },

    grow() {
      autosize.update(this.$refs.markdown);
    },

    setTax(i) {
      if (typeof i === "object") i = i.target.value;

      this.band = this.tax.find(t => t.number === i) || this.tax[0];
    }
  },

  mounted() {
    this.pets = this.place.pets;
    this.title = `£${this.place.price} - ${this.place.address}`;
    this.image = this.place.images[0];

    // need to tidy this
    this.markdown = `**Price:** £${this.place.price}\n\n**Bedrooms:** ${
      this.place.rooms
    }\n\n**Address:** ${this.place.address}${
      this.place.postcode ? ", " + this.place.postcode : ""
    }\n\n### Description\n${this.place.description}`;

    this.setTax(this.place.number);

    autosize(this.$refs.markdown);
  }
};
</script>

<template>
  <div class="row justify-content-between">
    <div class="col-6">
      <div class="gallery">
        <div class="gallery-col" v-for="img in place.images" :key="img">
          <img
            @click="image = img"
            class="image-select"
            :class="{ active: image == img }"
            :src="img"
            alt="owo an image"
          >
        </div>
      </div>

      <span class="label">Labels</span>
      <div class="emoji-text pets" @click="pets = !pets">
        <template v-if="pets == 'idk'">
          <span>🙀</span> - unsure about pets
        </template>

        <template v-else-if="pets">
          <span>😻</span> - pets considered
        </template>

        <template v-else>
          <span>😿</span> - no pets
        </template>
      </div>

      <div class="row">
        <div class="col-auto">
          <span class="label">Band</span>
          {{ band.band }}
        </div>

        <div class="col-auto">
          <span class="label">Per Year</span>
          £{{ band.year }}
        </div>

        <div class="col-auto">
          <span class="label">Per Month</span>
          £{{ band.month }}
        </div>

        <div class="col">
          <span class="label">Select</span>
          <select @change="setTax" class="tax-select">
            <option
              v-for="item in tax"
              :value="item.number"
              :key="item.number"
              :selected="item.number === band.number"
            >{{ item.address.toLowerCase() }} ({{ item.band }} - £{{ item.year }} - £{{ item.month }})</option>
          </select>
        </div>
      </div>

      <span class="label">Title</span>
      <input type="text" v-model="title">
      
      <span class="label">Description</span>
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

        <div class="buttons">
          <button type="button" class="cancel">
            <span>Reset</span>
          </button>
          <button type="button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$accent: #bba3d0;

.pets {
  margin-bottom: 30px;
  cursor: pointer;
  user-select: none;
  text-align: left;
}

input,
select,
textarea {
  width: 100%;
  border: 2px dashed $accent;
  padding: 15px;
  text-align-last: left;
  margin-bottom: 30px;
  border-radius: 0;
  background: none;

  &:focus {
    outline: none;
  }
}

textarea {
  margin-bottom: 0;
  min-height: 330px;
}

.tax-select {
  text-transform: capitalize;
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
  padding: 20px;
  max-height: 250px;
  overflow: scroll;
  background-color: #ebeef0;
  margin-bottom: 15px;
}

.gallery {
  position: relative;
  display: flex;
  overflow: scroll;
  margin-bottom: 15px;
  padding-bottom: 15px;
}

.gallery-col {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }
}

.image-select {
  width: 160px;
  height: 120px;
  cursor: pointer;
  object-fit: cover;

  border: 2px dashed transparent;
  transition: border-color 0.3s;

  &.active {
    border-color: $accent;
  }
}
</style>
