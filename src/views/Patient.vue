<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height patient-background"
                    fluid style="max-height: 100vh;"
            >

            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "patient"
    }
</script>


<style scoped>

    .patient-background {
        background: url('../assets/patient-background.jpg');
        background-size: cover;
        width:100%;
        height: 100%;
        color:teal;
    }
    a {
        color: white ;
        text-decoration: none;
        font-weight: bold;
    }

</style>
