<template>
  <div class="homepage">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>

      <el-col :xs="24" :span="12">
        <homepageCarousel />
      </el-col>
      <el-col :xs="24" :span="12">
        <span style="color:white;">SearchArea</span>
      </el-col>

      <el-col :span="24">
        <div class="randomSelect">
          <div class="twoColumns twoColumns--flex">
            <div v-loading="fetchingData" class="randomSelect__drink">
              <img
                :src="drinks[0] ? drinks[0].thumbImg : ''"
                class="randomSelect__image"
                alt="randomDrinkImage"
              />
            </div>
          </div>
          <div class="twoColumns">
            <div class="randomSelect__content">
              <p class="randomSelect__title">
                {{ drinks[0] ? drinks[0].name : "Drink Name" }}
              </p>
              <ingredientsTable />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import homepageCarousel from "./../components/homepageCarousel";
import ingredientsTable from "./../components/ingredientsTable";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Homepage",
  components: { navbar, homepageCarousel, ingredientsTable },
  created() {
    this.getARandomCocktail();
  },
  computed: {
    ...mapGetters("cocktails", ["drinks", "fetchingData"])
  },
  methods: {
    ...mapActions("cocktails", ["getARandomCocktail"])
  }
};
</script>

<style lang="scss" scoped src="./../styles/homepage.scss"></style>
