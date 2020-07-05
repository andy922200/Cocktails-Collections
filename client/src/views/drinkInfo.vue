<template>
  <div class="drinkInfo">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "drinkInfo",
  components: { navbar },
  created() {
    let drinkId = this.$route.params.id;
    this.getACocktail(drinkId);
  },
  destroyed() {
    this.setDrinks([]);
  },
  computed: {
    ...mapGetters("cocktails", ["drinks"])
  },
  methods: {
    ...mapMutations("cocktails", ["setDrinks"]),
    ...mapActions("cocktails", ["getACocktail"])
  }
};
</script>

<style></style>
