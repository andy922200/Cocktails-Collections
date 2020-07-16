<template>
  <div id="app" class="default-settings pa-1">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  created() {
    this.initialize();
    window.addEventListener("resize", this.detectWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWindowWidth);
  },
  computed: {
    ...mapGetters([
      "isValidatingUser",
      "isAuthenticated",
      "currentUser",
      "token"
    ])
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
