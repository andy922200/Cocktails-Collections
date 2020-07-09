<template>
  <div class="homepage">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>

      <el-col :span="24" class="display-flex-all-center flex-wrap">
        <el-col :xs="24" :span="12">
          <homepageCarousel />
        </el-col>
        <el-col :xs="24" :span="12">
          <searchBar />
        </el-col>
      </el-col>

      <el-col :span="24">
        <div class="randomSelect">
          <div class="twoColumns twoColumns--flex">
            <div>
              <p class="randomSelect__title randomSelect__title--greetings">
                Hi! Cocktail fans!
              </p>
              <p class="randomSelect__title randomSelect__title--greetings">
                {{ today }}
              </p>

              <div
                v-loading="fetchingData"
                class="randomSelect__drink"
                @click="redirectToDrink(drinks[0].id)"
              >
                <img
                  :src="drinks[0] ? drinks[0].thumbImg : ''"
                  class="randomSelect__image"
                  alt="randomDrinkImage"
                />
              </div>
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
import searchBar from "./../components/searchBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Homepage",
  components: { navbar, homepageCarousel, ingredientsTable, searchBar },
  created() {
    this.getARandomCocktail();
  },
  computed: {
    ...mapGetters(["today"]),
    ...mapGetters("cocktails", ["drinks", "fetchingData"])
  },
  methods: {
    ...mapActions("cocktails", ["getARandomCocktail"]),
    redirectToDrink(drinkId) {
      this.$router.push({ name: "drinkInfo", params: { id: drinkId } });
    }
  }
};
</script>

<style lang="scss" scoped src="./../styles/homepage.scss"></style>
