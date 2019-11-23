<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height healthy-background"
                    fluid style="max-height: 100vh;"
            >

            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "healthy"
    }
</script>

<style scoped>
    .healthy-background {
        background: url('../assets/sign-in-background.jpg');
        background-size: cover;
        width: 100%;
        height: 100%;
        color:teal;
    }
    a {
        color: white ;
        text-decoration: none;
        font-weight: bold;
    }
</style>
