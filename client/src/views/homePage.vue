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
import navbar from "./../components/navbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { navbar },
  computed: {
    ...mapGetters("cocktails", ["searchRules"])
  }
};
</script>

<style lang="scss" scoped></style>
