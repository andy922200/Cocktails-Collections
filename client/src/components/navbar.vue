<template>
    <div class="navbar">
        <div class="icon">
            <router-link to="/">
                <i class="el-icon-cold-drink">
                    <span class="title">Cocktails Collections</span>
                </i>
            </router-link>
        </div>

        <div class="expansion-select">
            <div class="expansion-select__icons">
                <i
                    class="el-icon-caret-bottom"
                    @click="triggerExpansion(true)"
                    v-if="!isExpansionOpen"
                ></i>
                <i
                    v-else
                    class="el-icon-caret-top"
                    @click="triggerExpansion(false)"
                ></i>
            </div>

            <div v-if="isExpansionOpen" class="expansion-select__options">
                <router-link
                    :to="{ name: 'userFavoriteDrinks' }"
                    v-if="isAuthenticated"
                >
                    <el-button size="small" type="success" class="log-in-favorite">Your Favorite</el-button>
                </router-link>
                <router-link :to="{ name: 'signIn' }" v-if="!isAuthenticated">
                    <el-button size="small" class="log-in-favorite log-in-favorite--brown">Log In</el-button>
                </router-link>
                <el-button
                    size="small"
                    class="log-in-favorite log-in-favorite--brown"
                    v-else
                    @click="triggerLogOut"
                >Log Out</el-button>
                <router-link :to="{ name: 'signUp' }">
                    <el-button type="primary" size="small" class="register">Register</el-button>
                </router-link>
            </div>
        </div>

        <div class="button-group">
            <router-link
                :to="{ name: 'userFavoriteDrinks', params: { userId: currentUser.id } }"
                v-if="isAuthenticated"
            >
                <el-button size="" type="success" class="log-in-favorite">Your Favorite</el-button>
            </router-link>
            <router-link :to="{ name: 'signIn' }" v-if="!isAuthenticated">
                <el-button size="" class="log-in-favorite log-in-favorite--brown">Log In</el-button>
            </router-link>
            <el-button
                size=""
                class="log-in-favorite log-in-favorite--brown"
                v-else
                @click="triggerLogOut"
            >Log Out</el-button>
            <router-link :to="{ name: 'signUp' }">
                <el-button type="primary" size="" class="register">Register</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import {
    mapGetters, mapMutations
} from 'vuex'
import {
    Toast
} from './../utils/mixin'

export default defineComponent({
    name: 'navbar',
    data () {
        return {
            isExpansionOpen: false
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'currentUser'])
    },
    methods: {
        ...mapMutations(['revokeAuthentication']),
        triggerExpansion (status) {
            status ? (this.isExpansionOpen = true) : (this.isExpansionOpen = false)
        },
        async triggerLogOut () {
            try {
                this.revokeAuthentication()
                if (this.$route.name !== 'homePage') {
                    this.$router.push({
                        name: 'homePage'
                    })
                }
                Toast.fire({
                    icon: 'success',
                    title: 'Log Out Successfully!'
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
})
</script>

<style lang="scss" scoped src="./../styles/navbar.scss"></style>
