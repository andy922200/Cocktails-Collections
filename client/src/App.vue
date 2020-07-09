<template>
  <div id="app" class="default-settings pa-1">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",
  created() {
    this.initialize();
    window.addEventListener("resize", this.detectWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWindowWidth);
  },
  methods: {
    ...mapMutations(["setWindowWidth"]),
    initialize() {
      this.detectWindowWidth();
    },
    detectWindowWidth() {
      this.setWindowWidth(window.innerWidth);
    }
  }
};
</script>

<style lang="scss" src="./styles/app.scss"></style>
