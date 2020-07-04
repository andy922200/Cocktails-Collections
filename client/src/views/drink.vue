<template>
  <div class="homePage">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";

export default {
  name: "drink",
  components: { navbar }
};
</script>

<style></style>
