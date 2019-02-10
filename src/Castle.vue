<script>
import { mapState } from "vuex";

import Host from "@/components/Host";
import Edit from "@/components/Edit";
import Auth from "@/components/Auth";
import Search from "@/components/Search";

export default {
  components: {
    Host,
    Edit,
    Auth,
    Search
  },

  data() {
    return {
      token: localStorage.trello_token
    };
  },

  computed: mapState(["mode"])
};
</script>

<template>
  <div id="castle">
    <div class="casle-contain">
      <Auth v-if="!token"/>

      <template v-else>
        <transition name="fade" mode="out-in">
          <component :is="mode"></component>
        </transition>

        <Host/>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap-reboot.scss";
@import "~bootstrap/scss/bootstrap-grid.scss";

$black: #324048;
$accent: #bba3d0;

body {
  background-color: #f5f5f5;
}

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

button {
  padding: 5px 25px;
  background-color: transparent;
  border: 2px solid $accent;
  color: $accent;
  font-weight: bold;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    // border-color: white;
    background-color: $accent;
    color: white;
  }
  &:focus {
    outline: none;
  }
}

.cancel {
  border-color: transparent;

  &:hover {
    background-color: transparent;
    color: $accent;

    span {
      &:before {
        transform: translateX(-100%);
        transition: transform 0.15s ease;
      }
      &:after {
        transform: translateX(0);
        transition: transform 0.15s 0.3s ease;
      }
    }
  }

  span {
    display: block;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 1px;
    position: relative;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      height: 2px;
      left: 0;
      bottom: 0;
      right: 0;
    }
    &:before {
      background-color: $accent;
      transition: transform 0.15s 0.3s ease;
    }
    &:after {
      background-color: $accent;
      transform: translateX(100%);
      transition: transform 0.15s ease;
    }
  }
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-left: -5px;
  margin-right: -5px;

  button {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
