<script>
export default {
  data() {
    return {
      x: 0,
      y: 0
    };
  },

  methods: {
    move(e) {
      this.x = e.clientX;
      this.y = e.clientY;
    }
  },

  computed: {
    float() {
      return `translate3d(${this.x / 50}px, ${this.y / 50}px, 0)`;
    },

    castle() {
      return `translate3d(${this.x / 50}px, 0, 0)`;
    },

    stars() {
      return `translate3d(${this.x / 10}px, ${this.y / 10}px, 0)`;
    },

    moon() {
      return `translate3d(${this.x / 30}px, ${this.y / 30}px, 0)`;
    }
  },

  mounted() {
    window.addEventListener("mousemove", this.move);
  }
};
</script>

<template>
  <div class="float" :style="{ transform: float }">
    <img
      class="float-image castle-building"
      alt="Castle Building Image Layer"
      :style="{ transform: castle }"
      src="../assets/castle.svg"
    >
    
    <img
      class="float-image stars"
      alt="Stars Image Layer"
      :style="{ transform: stars }"
      src="../assets/stars.svg"
    >
    
    <img
      class="float-image moon"
      alt="Moon Image Layer"
      :style="{ transform: moon }"
      src="../assets/moon.svg"
    >
  </div>
</template>

<style scoped lang="scss">
.float {
  width: 25vw;
  height: 25vw;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid #324048;
  transition: transform 0.3s ease-out;
  will-change: transform;
  user-select: none;
}

.float-image {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: inherit;
  will-change: transform;
}

.castle-building {
  top: 10px;
}

.stars {
  top: -100px;
  left: -50px;
}
</style>
