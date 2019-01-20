<script>
import { mapState } from "vuex";

import Host from "@/components/Host";
import Edit from "@/components/Edit";
import Search from "@/components/Search";

export default {
  components: {
    Host,
    Edit,
    Search
  },

  computed: mapState(["mode"])
};
</script>

<template>
  <div id="castle">
    <div class="casle-contain">
      <transition name="fade" mode="out-in">
        <component :is="mode"></component>
      </transition>

      <Host/>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap-reboot.scss";
@import "~bootstrap/scss/bootstrap-grid.scss";

$black: #324048;
$accent: #bba3d0;

#castle {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  font-weight: bold;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.casle-contain {
  padding: 30px;
}

img {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.emoji-text {
  display: flex;
  align-items: center;
  line-height: 1;

  span {
    font-size: 1.7em;
    margin-right: 5px;
    margin-bottom: -5px;
    margin-bottom: -0.2em;
  }
}

.label {
  display: block;
  color: $accent;
  font-size: 12px;
}

pre {
  padding: 15px;
  text-align: left;
  font-size: 10px;
  border: 2px dashed coral;
}
</style>
