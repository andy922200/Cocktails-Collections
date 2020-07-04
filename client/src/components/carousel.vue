<template>
  <div class="carousel px-3 py-6">
    <el-carousel :interval="5000" type="card" arrow="always" height="300px">
      <el-carousel-item
        v-for="item in popularDrinks"
        :key="item.id"
        class="carousel__item"
      >
        <div
          class="carousel__image"
          :style="{ backgroundImage: `url(${item.thumbImg})` }"
          @click="redirectToDrink(item.id)"
        >
          <div class="carousel__text">{{ item.name }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Carousel",
  created() {
    this.getPopularCocktails();
  },
  computed: {
    ...mapGetters("cocktails", ["popularDrinks"])
  },
  methods: {
    ...mapActions("cocktails", ["getPopularCocktails"]),
    redirectToDrink(drinkId) {
      this.$router.push({ name: "drink", params: { id: drinkId } });
    }
  }
};
</script>

<style lang="scss" scoped src="./../styles/carousel.scss"></style>
