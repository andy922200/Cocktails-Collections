<template>
  <div class="searchBar">
    <h3 class="searchBar__title">
      Search / Filter
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        class="search-button"
        :disabled="
          fetchingOptions || fetchingSearchResults || isAllSearchRulesEmpty
        "
        @click="validateSearchItems"
        >Search
      </el-button>
    </h3>
    <el-collapse
      v-model="activeCollapseItems"
      class="searchBar__collapse"
      accordion
    >
      <el-collapse-item title="飲品類型 Categories" name="drinkTypes">
        <el-select
          v-model="selectedDrinkTypes"
          class="searchBar__selections"
          multiple
          :multiple-limit="3"
          collapse-tags
          filterable
          :loading="fetchingOptions"
          :loading-text="loadingText"
          :no-match-text="noMatchText"
          :no-data-text="noMatchText"
          placeholder="Categories"
        >
          <el-option
            v-for="(item, index) in drinkTypesOptions"
            :key="index"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-collapse-item>
      <el-collapse-item title="材料 Ingredients" name="ingredients">
        <el-select
          v-model="selectedIngredients"
          class="searchBar__selections"
          multiple
          :multiple-limit="5"
          collapse-tags
          filterable
          :loading="fetchingOptions"
          :loading-text="loadingText"
          :no-match-text="noMatchText"
          :no-data-text="noMatchText"
          placeholder="Ingredients"
        >
          <el-option
            v-for="(item, index) in ingredientsOptions"
            :key="index"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-collapse-item>
      <el-collapse-item title="關鍵字搜尋 Keywords" name="keywords">
        <el-input
          placeholder="Please enter your keywords"
          v-model="keywords"
          class="searchBar__selections"
        >
        </el-input>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "searchBar",
  data() {
    return {
      activeCollapseItems: [],
      selectedDrinkTypes: [],
      selectedIngredients: [],
      keywords: "",
      noMatchText: "No Data 無資料",
      loadingText: "Loading... 載入中"
    };
  },
  created() {
    this.getListOptions([
      { type: "drinkTypes", params: { c: "list" } },
      { type: "ingredients", params: { i: "list" } }
    ]);
  },
  computed: {
    ...mapGetters("cocktails", [
      "searchResults",
      "searchRules",
      "fetchingData",
      "fetchingSearchResults",
      "fetchingOptions",
      "drinkTypesOptions",
      "ingredientsOptions"
    ]),

    isAllSearchRulesEmpty() {
      return (
        this.selectedDrinkTypes.length === 0 &&
        this.selectedIngredients.length === 0 &&
        !this.keywords
      );
    }
  },
  methods: {
    ...mapMutations("cocktails", ["setSearchRules"]),
    ...mapActions("cocktails", ["getCocktails", "getListOptions"]),

    async validateSearchItems() {
      try {
        if (this.selectedDrinkTypes.length > 0) {
          this.setSearchRules(this.selectedDrinkTypes);
          await this.getCocktails();
        }

        if (this.selectedIngredients.length > 0) {
          this.setSearchRules(this.selectedIngredients);
          await this.getCocktails();
        }

        if (this.keywords) {
          if (this.keywords.length > 0) {
            this.setSearchRules([{ type: "keywords", value: this.keywords }]);
            await this.getCocktails();
          }
        }
        this.$router.push({ name: "searchResult" });
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    activeCollapseItems: {
      async handler(newVal) {
        switch (newVal) {
          case "drinkTypes":
            this.selectedIngredients = [];
            this.keywords = null;
            break;
          case "ingredients":
            this.selectedDrinkTypes = [];
            this.keywords = null;
            break;
          case "keywords":
            this.selectedIngredients = [];
            this.selectedDrinkTypes = [];
            break;
        }
      }
    }
  }
};
</script>

<style lang="scss" src="./../styles/searchBar.scss"></style>
