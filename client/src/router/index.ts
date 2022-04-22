import {
    createRouter, createWebHistory, RouteRecordRaw
} from 'vue-router'
import store from '../store'
import homepage from '../views/homepage.vue'
import NotFound from '../views/notFound.vue'
import drinkInfo from '../views/drinkInfo.vue'
import searchResult from '../views/searchResult.vue'
import signIn from '../views/signIn.vue'
import userFavoriteDrinks from '../views/userFavoriteDrinks.vue'
import signUp from '../views/signUp.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'homePage',
        component: homepage
    },
    {
        path: '/signIn',
        name: 'signIn',
        component: signIn
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: signUp
    },
    {
        path: '/drinks/searchResult',
        name: 'searchResult',
        component: searchResult
    },
    {
        path: '/user/:userId/favoriteDrinks',
        name: 'userFavoriteDrinks',
        component: userFavoriteDrinks
    },
    {
        path: '/drinks/:drinkId',
        name: 'drinkInfo',
        component: drinkInfo
    },
    {
        path: '/:catchAll(.*)/',
        name: 'not-found',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkExactActiveClass: 'active',
    routes
})

router.beforeEach(async (to, from, next) => {
    const tokenInStore = store.state.token
    const tokenInLocalStorage = localStorage.getItem('token')
    let isAuthenticated = store.state.isAuthenticated
    // compare the difference between the local and the store
    // if true, fetchCurrentUser
    if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
        isAuthenticated = await store.dispatch('fetchCurrentUser')
    }

    if (!isAuthenticated && to.name === 'userFavoriteDrinks') {
        next('signIn')
        return
    }
    next()
})

router.afterEach(() => {
    const bodyDOM = document.querySelector('body')
    if (bodyDOM) {
        bodyDOM.setAttribute('style', 'background-color: #2F0900')
    }
})

export default router
