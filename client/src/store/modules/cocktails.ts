import {
    cocktailsAPIs,
    baseOnlineDbImageIngredientsURL
} from '../../utils/apis.js'

const data = {
    namespaced: true,

    state: {
        drinks: [],
        popularDrinks: [],
        searchRules: {
            drinkTypes: [],
            ingredients: [],
            keywords: []
        },
        searchResults: [],
        drinkTypesOptions: [],
        ingredientsOptions: [],
        fetchingData: false,
        fetchingSearchResults: false,
        fetchingOptions: false
    },

    getters: {
        drinks: state => state.drinks,
        popularDrinks: state => state.popularDrinks,
        searchRules: state => state.searchRules,
        searchResults: state => state.searchResults,
        drinkTypesOptions: state => state.drinkTypesOptions,
        ingredientsOptions: state => state.ingredientsOptions,
        fetchingData: state => state.fetchingData,
        fetchingSearchResults: state => state.fetchingSearchResults,
        fetchingOptions: state => state.fetchingOptions
    },

    mutations: {
        setDrinks (state, data) {
            state.drinks = data
        },
        setPopularDrinks (state, data) {
            state.popularDrinks = data
        },
        setSearchRules (state, data) {
            if (data.length === 0) {
                state.searchRules = {
                    drinkTypes: [],
                    ingredients: [],
                    keywords: []
                }
            } else {
                data.forEach(d => {
                    state.searchRules[d.type].push(d.value)
                })
            }
            return state.searchRules
        },
        setSearchResults (state, data) {
            state.searchResults = data
        },
        setDrinkTypesOptions (state, data) {
            state.drinkTypesOptions = data
        },
        setIngredientsOptions (state, data) {
            state.ingredientsOptions = data
        },
        setFetchingData (state, status) {
            state.fetchingData = status
        },
        setFetchingSearchResults (state, status) {
            state.fetchingSearchResults = status
        },
        setFetchingOptions (state, status) {
            state.fetchingOptions = status
        }
    },

    actions: {
        async getCocktails ({ commit, getters, dispatch }) {
            try {
                const { searchRules } = getters
                const ingredients = searchRules.ingredients
                const drinkTypes = searchRules.drinkTypes
                const keywords = searchRules.keywords
                const rawData = [] as Record<string, any>[]

                commit('setFetchingSearchResults', true)

                if (drinkTypes.length > 0) {
                    for (let i = 0; i < drinkTypes.length; i++) {
                        const params = {
                            c: drinkTypes[i]
                        }

                        const {
                            data: { drinks: drinksRawData }
                        } = await cocktailsAPIs.getFilteredCocktails({
                            params
                        })

                        rawData.push(drinksRawData)
                    }
                }

                if (ingredients.length > 0) {
                    let paramsInput = ''

                    for (let i = 0; i < ingredients.length; i++) {
                        paramsInput += ',' + ingredients[i]
                    }
                    paramsInput = paramsInput.slice(5, paramsInput.length)

                    const params = {
                        i: paramsInput
                    }

                    const {
                        data: { drinks: drinksRawData }
                    } = await cocktailsAPIs.getFilteredCocktails({
                        params
                    })

                    rawData.push(drinksRawData)
                }

                if (keywords.length > 0) {
                    const params = {
                        s: keywords[0]
                    }

                    const {
                        data: { drinks: drinksRawData }
                    } = await cocktailsAPIs.getSearchedCocktails({
                        params
                    })

                    rawData.push(drinksRawData)
                }

                await dispatch('formatSearchResults', rawData)
                await dispatch('resetSearchRules')

                commit('setFetchingSearchResults', false)
            } catch (err) {
                console.log(err)
                commit('setFetchingSearchResults', false)
            }
        },

        async getACocktail ({ commit, dispatch }, drinkId) {
            try {
                commit('setFetchingData', true)

                const {
                    data: { drinks: drinkRawData }
                } = await cocktailsAPIs.getACocktailById({
                    params: {
                        i: drinkId
                    }
                })

                await dispatch('formatDrinksData', {
                    type: 'setDrinks',
                    data: drinkRawData
                })

                commit('setFetchingData', false)
            } catch (err) {
                console.log(err)
                commit('setFetchingData', false)
            }
        },

        async getARandomCocktail ({ commit, dispatch }) {
            try {
                commit('setFetchingData', true)

                const {
                    data: { drinks: randomDrink }
                } = await cocktailsAPIs.getARandomCocktail()

                await dispatch('formatDrinksData', {
                    type: 'setDrinks',
                    data: randomDrink
                })

                commit('setFetchingData', false)
            } catch (err) {
                console.log(err)
                commit('setFetchingData', false)
            }
        },

        async getPopularCocktails ({ commit, dispatch }) {
            try {
                commit('setFetchingData', true)

                const {
                    data: { drinks: drinksRawData }
                } = await cocktailsAPIs.getPopularCocktails()

                await dispatch('formatDrinksData', {
                    type: 'setPopularDrinks',
                    data: drinksRawData
                })

                commit('setFetchingData', false)
            } catch (err) {
                console.log(err)
                commit('setFetchingData', false)
            }
        },

        async getListOptions ({ commit }, types) {
            try {
                commit('setFetchingOptions', true)

                for (let i = 0; i < types.length; i++) {
                    const {
                        data: { drinks: rawData }
                    } = await cocktailsAPIs.getListOptions({
                        params: types[i].params
                    })
                    let formattedData = []

                    if (rawData.length > 0) {
                        formattedData = rawData.map(d => {
                            const set = {
                            } as Record<string, any>

                            switch (types[i].type) {
                                case 'drinkTypes':
                                    set.type = 'drinkTypes'
                                    set.label = d.strCategory
                                    set.value = d.strCategory
                                    break
                                case 'ingredients':
                                    set.type = 'ingredients'
                                    set.label = d.strIngredient1
                                    set.value = d.strIngredient1
                                    break
                            }

                            return set
                        })
                        formattedData.sort((a: Record<string, any>, b: Record<string, any>) =>
                            a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
                        )
                    }

                    switch (types[i].type) {
                        case 'drinkTypes':
                            commit('setDrinkTypesOptions', formattedData)
                            break
                        case 'ingredients':
                            commit('setIngredientsOptions', formattedData)
                            break
                    }
                }

                commit('setFetchingOptions', false)
            } catch (err) {
                console.log(err)
                commit('setFetchingOptions', false)
            }
        },

        async formatDrinksData ({ commit }, dataSet) {
            try {
                const type = dataSet.type

                let formattedDrinks = dataSet.data.map(item => {
                    const result = {
                        id: Number(item.idDrink),
                        name: item.strDrink,
                        category: item.strCategory,
                        alcoholic: item.strAlcoholic,
                        modifiedDate: item.dateModified,
                        thumbImg: item.strDrinkThumb,
                        glass: item.strGlass,
                        instructions: item.strInstructions,
                        ingredients: [] as Record<string, any>,
                        tags: [] as Record<string, any>
                    }
                    let ingredientCount = 1
                    let stopGenerateIngredientItems = false

                    while (!stopGenerateIngredientItems) {
                        const set = {
                            name: '',
                            measure: '',
                            thumb: ''
                        }
                        const ingredient = item[`strIngredient${ingredientCount}`]
                        const measure = item[`strMeasure${ingredientCount}`]
                        if (ingredient) {
                            set.name = ingredient.trim()

                            if (measure) {
                                set.measure = measure.trim()
                            } else {
                                set.measure = 'Q.S.'
                            }

                            set.thumb = `${baseOnlineDbImageIngredientsURL}/${ingredient}-small.png`
                            result.ingredients.push(set)
                            ingredientCount += 1
                        } else {
                            stopGenerateIngredientItems = true
                        }
                    }

                    if (item.strTags) {
                        result.tags = item.strTags.split(',')
                    } else {
                        result.tags = []
                    }

                    return result
                })

                if (type === 'setPopularDrinks') {
                    const resultLimit = 7
                    formattedDrinks = formattedDrinks.slice(0, resultLimit)
                }

                commit(`${type}`, formattedDrinks)
            } catch (err) {
                console.log(err)
            }
        },

        async formatSearchResults ({ commit }, rawData) {
            try {
                let result = [] as Record<string, any>[]

                if (rawData[0] !== 'None Found') {
                    const mergedRawData = [...rawData]
                    result = mergedRawData.map(d => {
                        const set = {
                        } as Record<string, any>

                        set.id = Number(d.idDrink)
                        set.name = d.strDrink
                        set.thumbImg = d.strDrinkThumb

                        return set
                    })

                    result = result.sort((a, b) =>
                        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                    )
                }

                const pageSize = 20
                const resultWithPage = [] as Record<string, any>[]
                const totalPage = Math.ceil(result.length / pageSize)

                for (let i = 1; i <= totalPage; i++) {
                    const pageObject = {
                        page: i,
                        data: [] as any[]
                    }

                    pageObject.data = result.slice((i - 1) * pageSize, i * pageSize)
                    resultWithPage.push(pageObject)
                }

                commit('setSearchResults', resultWithPage)
            } catch (err) {
                console.log(err)
            }
        },

        async resetSearchRules ({ commit }) {
            try {
                commit('setSearchRules', [])
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default data
