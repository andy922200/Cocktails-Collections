<template>
  <el-row>
    <el-col :span="24">
      <div class="homePage">
        <navbar />
      </div>
    </el-col>
  </el-row>
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
