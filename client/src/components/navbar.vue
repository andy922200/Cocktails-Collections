<template>
  <div class="navbar">
    <div class="icon">
      <i class="el-icon-cold-drink">
        <span class="title">Cocktails Collections</span>
      </i>
    </div>

    <div class="expansion-select">
      <i class="el-icon-caret-bottom"></i>
    </div>

    <div class="button-group">
      <el-button size="medium" class="log-in">Log In</el-button>
      <el-button type="primary" size="medium" class="register"
        >Register</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style lang="scss" scoped src="./../styles/navbar.scss"></style>
