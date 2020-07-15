<template>
  <div class="navbar">
    <div class="icon">
      <router-link to="/">
        <i class="el-icon-cold-drink">
          <span class="title">Cocktails Collections</span>
        </i>
      </router-link>
    </div>

    <div class="expansion-select">
      <div class="expansion-select__icons">
        <i
          class="el-icon-caret-bottom"
          @click="triggerExpansion(true)"
          v-if="!isExpansionOpen"
        ></i>
        <i
          v-else
          class="el-icon-caret-top"
          @click="triggerExpansion(false)"
        ></i>
      </div>

      <div v-if="isExpansionOpen" class="expansion-select__options">
        <router-link :to="{ name: 'signIn' }">
          <el-button size="small" class="log-in">Log In</el-button>
        </router-link>
        <el-button type="primary" size="small" class="register" disabled
          >Register</el-button
        >
      </div>
    </div>

    <div class="button-group">
      <router-link :to="{ name: 'signIn' }">
        <el-button size="medium" class="log-in">Log In</el-button>
      </router-link>
      <el-button type="primary" size="medium" class="register" disabled
        >Register</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      isExpansionOpen: false
    };
  },
  methods: {
    triggerExpansion(status) {
      status ? (this.isExpansionOpen = true) : (this.isExpansionOpen = false);
    }
  }
};
</script>

<style lang="scss" scoped src="./../styles/navbar.scss"></style>
