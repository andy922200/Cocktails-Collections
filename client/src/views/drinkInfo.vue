<template>
    <div class="drinkInfo">
        <el-row>
            <el-col :span="24">
                <navbar />
            </el-col>
            <el-col :span="24">
                <div class="content">
                    <div v-loading="fetchingData" class="selectedDrink">
                        <img
                            :src="drinks[0] ? drinks[0].thumbImg : ''"
                            class="selectedImage"
                            alt="selectedCocktail"
                        />
                    </div>
                    <div class="content_info">
                        <ul class="content_infoList" v-if="drinkInfoForList.length > 0">
                            <li v-for="(item, index) in drinkInfoForList" :key="index">
                                <template v-if="item.name === 'Tags'">
                                    <el-tag
                                        v-for="(subItem, index) in item.value"
                                        :key="index"
                                        :type="subItem.type"
                                        effect="dark"
                                        class="tag"
                                    >
                                        {{ subItem.label }}
                                    </el-tag>
                                </template>
                                <template v-else>
                                    <p :class="`${item.name}--name general-name-style`">
                                        {{ item.name }}
                                    </p>
                                    <p :class="`${item.name}--value general-value-style`">
                                        {{ item.value }}
                                    </p>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <ingredientsTable />
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
import ingredientsTable from './../components/ingredientsTable.vue'
import {
    mapGetters, mapMutations, mapActions
} from 'vuex'

export default defineComponent({
    name: 'drinkInfo',
    components: {
        navbar,
        ingredientsTable
    },
    created (this: any) {
        const drinkId = this.$route.params.drinkId
        this.getACocktail(drinkId)
    },
    unmounted (this: any) {
        this.setDrinks([])
    },
    computed: {
        ...mapGetters('cocktails', ['fetchingData', 'drinks']),
        drinkInfoForList () {
            const result = [] as Record<string, any>[]

            if (this.drinks[0]) {
                const ObjectKeys = Object.keys(this.drinks[0]).filter(
                    key => key !== 'id' && key !== 'ingredients' && key !== 'thumbImg'
                )

                if (ObjectKeys.length !== 0) {
                    ObjectKeys.forEach(key => {
                        const set = {
                            name: null as null | string,
                            value: null as null | Record<string, any>[]
                        }

                        const mapping = {
                            name: 'Name',
                            category: 'Category',
                            alcoholic: 'Is it alcoholic?',
                            modifiedDate: 'Last Updated at',
                            glass: 'Glass',
                            instructions: 'Instructions',
                            tags: 'Tags',
                            thumbImg: 'ThumbImg'
                        }

                        set.name = mapping[key]
                        set.value = this.drinks[0][key]

                        if (set.name === 'Tags' && Array.isArray(set.value)) {
                            set.value = set.value.map((d, index) => {
                                const newObject = {
                                } as Record<string, any>
                                newObject.label = d

                                switch (index) {
                                    case 0:
                                        newObject.type = ''
                                        break
                                    case 1:
                                        newObject.type = 'success'
                                        break
                                    case 2:
                                        newObject.type = 'info'
                                        break
                                    case 3:
                                        newObject.type = 'warning'
                                        break
                                    case 4:
                                        newObject.type = 'danger'
                                        break
                                    default:
                                        newObject.type = ''
                                        break
                                }

                                return newObject
                            })
                        }

                        result.push(set)
                    })
                }
            }

            return result
        }
    },
    methods: {
        ...mapMutations('cocktails', ['setDrinks']),
        ...mapActions('cocktails', ['getACocktail'])
    }
})
</script>

<style lang="scss" scoped src="./../styles/drinkInfo.scss"></style>
