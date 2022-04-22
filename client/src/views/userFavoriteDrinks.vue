<template>
    <div class="userFavoriteDrinks">
        <navbar />
        <h3 style="color: #fff;">UserFavoriteDrinks</h3>
        <h3 style="color: #fff;">Waiting for Editing......</h3>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import navbar from './../components/navbar.vue'

export default defineComponent({
    name: 'userFavoriteDrinks',
    components: {
        navbar
    }
})
</script>
