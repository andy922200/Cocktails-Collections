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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "drink",
  components: { navbar },
  created() {
    let drinkId = this.$route.params.id;
    this.getACocktail(drinkId);
  },
  computed: {
    ...mapGetters("cocktails", ["drinks"])
  },
  methods:{
    ...mapActions("cocktails", ["getACocktail"])
  }
};
</script>

<style></style>
