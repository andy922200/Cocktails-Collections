<template>
    <div id="app" class="default-settings pa-1">
        <router-view />
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import {
    mapGetters, mapMutations
} from 'vuex'

export default defineComponent({
    name: 'App',
    created (this: any) {
        this.initialize()
        window.addEventListener('resize', this.detectWindowWidth)
    },
    unmounted () {
        window.removeEventListener('resize', this.detectWindowWidth)
    },
    computed: {
        ...mapGetters([
            'isValidatingUser',
            'isAuthenticated',
            'currentUser',
            'token'
        ])
    },
    methods: {
        ...mapMutations(['setWindowWidth']),
        initialize () {
            this.detectWindowWidth()
        },
        detectWindowWidth () {
            this.setWindowWidth(window.innerWidth)
        }
    }
})
</script>

<style lang="scss" src="./styles/app.scss"></style>
