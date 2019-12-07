<template>
    <v-app>
        <app-navigation></app-navigation>
        <v-content transition="slide-x-transition">
            <vue-progress-bar></vue-progress-bar>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import AppNavigation from '@/components/AppNavigation';
    import VueProgressBar from 'vue-progressbar'

    export default {
        name: 'App',
        components: {
            AppNavigation,
            VueProgressBar
        }
    };
</script>

<style>
</style>
