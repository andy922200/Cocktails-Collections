<template>
  <div class="homePage">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>
      <el-col :xs="24" :span="12">
        <carousel />
      </el-col>
      <!-- <el-col :xs="24" :span="12">
        <carousel />
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import carousel from "./../components/carousel";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { navbar, carousel },
  computed: {
    ...mapGetters("cocktails", ["searchRules"])
  }
};
</script>

<style lang="scss" scoped></style>
