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
            <div class="randomSelect__drink">
              <img
                :src="drinks[0].thumbImg"
                class="randomSelect__image"
                alt="randomDrinkImage"
              />
            </div>
          </div>
          <div class="twoColumns">
            <div class="randomSelect__content">
              <p class="randomSelect__title">{{ drinks[0].name }}</p>
              <el-table :data="drinks[0].ingredients" border>
                <el-table-column prop="name" label="Name">
                </el-table-column>
                <el-table-column prop="measure" label="Quantity">
                </el-table-column>
              </el-table>
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Homepage",
  components: { navbar, homepageCarousel },
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
