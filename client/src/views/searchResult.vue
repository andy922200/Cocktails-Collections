<template>
  <div class="searchResult">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>

      <el-col :span="24">
        <div class="drinksCards">
          <h4 class="result-title">SearchResult</h4>
          <el-pagination
            background
            class="pagination"
            layout="prev, pager, next"
            :page-size="1"
            @current-change="handleCurrentChange"
            :total="searchResults.length"
          >
          </el-pagination>
          <template v-if="searchResults.length !== 0">
            <el-card
              :body-style="cardStyle"
              class="drinksCard"
              v-for="(item, index) in currentPageData"
              :key="index"
            >
              <div class="image__wrapper" @click="redirectToDrink(item.id)">
                <img :src="item.thumbImg" class="image" />
              </div>
              <div class="drinksCard-wrapper">
                <h6 class="drinksCard-title">{{ item.name }}</h6>
              </div>
            </el-card>
          </template>
          <template v-else>
            <el-card :body-style="cardStyle" class="drinksCard">
              <div class="drinksCard-wrapper">
                <h6 class="drinksCard-title">No data......</h6>
                <router-link to="/">
                  <el-button
                    type="info"
                    size="medium"
                    round
                    class="button-homepage"
                    >Back to Homepage</el-button
                  >
                </router-link>
              </div>
            </el-card>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "searchResult",
  components: { navbar },
  data() {
    return {
      cardStyle: {
        padding: "10px"
      },
      currentPageNumber: 1
    };
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === "searchResult" && to.name === "homePage") {
      this.setSearchResults([]);
    }
    next();
  },
  computed: {
    ...mapGetters("cocktails", ["searchResults"]),
    currentPageData() {
      return this.searchResults.length > 0
        ? this.searchResults[this.currentPageNumber - 1].data
        : [];
    }
  },
  methods: {
    ...mapMutations("cocktails", ["setSearchResults"]),
    redirectToDrink(drinkId) {
      this.$router.push({ name: "drinkInfo", params: { drinkId: drinkId } });
    },
    handleCurrentChange(page) {
      this.currentPageNumber = page;
    }
  }
};
</script>

<style lang="scss" scoped src="./../styles/searchResult.scss"></style>
