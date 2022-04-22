<template>
    <div class="carousel px-3 py-6">
        <el-carousel
            :interval="5000"
            :initial-index="1"
            :type="windowWidth >= 414 ? 'card' : ''"
            indicator-position="outside"
            arrow="always"
            height="300px"
            v-loading="fetchingData"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
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

<script lang="ts">
import {
    defineComponent
} from 'vue'
import {
    mapGetters, mapActions
} from 'vuex'

export default defineComponent({
    name: 'homepageCarousel',
    mounted (this: any) {
        this.getPopularCocktails()
    },
    computed: {
        ...mapGetters(['windowWidth']),
        ...mapGetters('cocktails', ['popularDrinks', 'fetchingData'])
    },
    methods: {
        ...mapActions('cocktails', ['getPopularCocktails']),
        redirectToDrink (drinkId: number) {
            this.$router.push({
                name: 'drinkInfo',
                params: {
                    drinkId: drinkId
                }
            })
        }
    }
})
</script>

<style lang="scss" scoped src="./../styles/homepageCarousel.scss"></style>
