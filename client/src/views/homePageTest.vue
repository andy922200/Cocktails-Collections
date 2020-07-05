<template>
  <div class="homePage">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>
      <el-col :xs="24" :span="12">
        <homepageCarousel />
      </el-col>
      <!-- <el-col :xs="24" :span="12">
        <carousel />
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import homepageCarousel from "./../components/homepageCarousel";

export default {
  name: "Home",
  components: { navbar, homepageCarousel }
};
</script>

<style lang="scss" scoped></style>