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

<script lang="ts">
import {
    defineComponent
} from 'vue'
import navbar from './../components/navbar.vue'
import homepageCarousel from './../components/homepageCarousel.vue'
import ingredientsTable from './../components/ingredientsTable.vue'
import searchBar from './../components/searchBar.vue'
import {
    mapGetters, mapActions
} from 'vuex'

export default defineComponent({
    name: 'Homepage',
    components: {
        navbar,
        homepageCarousel,
        ingredientsTable,
        searchBar
    },
    created (this: any) {
        this.getARandomCocktail()
    },
    computed: {
        ...mapGetters(['today']),
        ...mapGetters('cocktails', ['drinks', 'fetchingData'])
    },
    methods: {
        ...mapActions('cocktails', ['getARandomCocktail']),
        redirectToDrink (this: any, drinkId: number) {
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

<style lang="scss" scoped src="./../styles/homepage.scss"></style>
