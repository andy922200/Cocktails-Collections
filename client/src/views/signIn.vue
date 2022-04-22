<template>
    <div class="signIn">
        <navbar />
        <div class="formStyle">
            <el-card class="loginCard">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            class="button--logIn"
                            @click="submitLogInForm"
                        >Submit 登入
                        </el-button>
                        <router-link to="/">
                            <el-button type="info">Homepage 回首頁</el-button>
                        </router-link>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import {
    mapGetters, mapActions
} from 'vuex'
import {
    Toast
} from './../utils/mixin'
import navbar from './../components/navbar.vue'

export default defineComponent({
    name: 'SignIn',
    components: {
        navbar
    },
    data () {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isValidatingUser', 'isAuthenticated', 'currentUser'])
    },
    methods: {
        ...mapActions(['signIn']),
        async validation () {
            const emailRule = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim

            if (!this.form.email || !this.form.password) {
                Toast.fire({
                    icon: 'warning',
                    title: 'Please enter email and password'
                })
                return false
            }

            if (!this.form.email.match(emailRule)) {
                Toast.fire({
                    icon: 'warning',
                    title: 'Please check your email format.'
                })
                return false
            }

            return true
        },
        async submitLogInForm () {
            try {
                const validationFormResult = await this.validation()

                if (validationFormResult) {
                    const fetchingStatus = await this.signIn(this.form)

                    if (fetchingStatus) {
                        Toast.fire({
                            icon: 'success',
                            title: 'Login Successfully!'
                        })
                        this.$router.push({
                            name: 'homePage'
                        })
                    } else {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Email or Password is not correct!'
                        })
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
})
</script>

<style lang="scss" scoped src="./../styles/signIn.scss"></style>
