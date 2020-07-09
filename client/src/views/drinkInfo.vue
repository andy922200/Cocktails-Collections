<template>
  <div class="drinkInfo">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>
      <el-col :xs="24" :span="12">
        <ingredientsTable />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import ingredientsTable from "./../components/ingredientsTable";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "drinkInfo",
  components: { navbar, ingredientsTable },
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
