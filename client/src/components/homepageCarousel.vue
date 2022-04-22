<template>
    <div class="carousel px-3 py-6">
        <template v-if="popularDrinks.length < 1">
            <div
                class="loading"
                v-loading="fetchingData"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
            </div>
        </template>
        <template v-else>
            <el-carousel
                :initial-index="0"
                :type="windowWidth >= 414 ? 'card' : ''"
                indicator-position="outside"
                arrow="always"
                height="300px"
            >
                <el-carousel-item
                    v-for="item in popularDrinks"
                    :key="item.id"
                    :name="item.id.toString()"
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
        </template>

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
