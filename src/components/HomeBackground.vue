<template>
    <v-container fluid fill-height class="home-background">
        <v-layout justify-center align-center column pa-5>
            <h3>为临床试验招募患者受试者、健康志愿者和发布临床项目</h3>


            <v-container>
                <v-layout row>
                    <v-flex md4>
                        <v-card class="mx-auto" max-width="344" raised>
                            <v-img src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" height="200px"></v-img>
                            <v-card-title>健康志愿者</v-card-title>
                            <v-card-subtitle>参与临床试验，推动世界医学进步</v-card-subtitle>
                            <v-card-actions>
                                <router-link
                                        to="/healthy"
                                        tag="v-btn"
                                >
                                <v-btn color="teal"  outlined>报名</v-btn>
                                </router-link>
                            </v-card-actions>
                        </v-card>
                    </v-flex>



                    <v-flex md4>
                        <v-card
                                class="mx-auto"
                                max-width="344"
                                raised
                        >
                            <v-img
                                    src="../assets/patient.jpg"
                                    height="200px"
                            ></v-img>

                            <v-card-title>
                                患者
                            </v-card-title>

                            <v-card-subtitle>
                                尝试新药物或新疗法，获得改善疾病的机会
                            </v-card-subtitle>

                            <v-card-actions>
                                <router-link
                                        to="/patient"
                                        tag="v-btn"
                                >
                                <v-btn color="teal" outlined>报名</v-btn>
                                </router-link>
                            </v-card-actions>


                        </v-card>
                    </v-flex>




                    <v-flex md4>
                        <v-card
                                class="mx-auto"
                                max-width="344"
                                raised
                        >
                            <v-img
                                    src="../assets/registration.jpg"
                                    height="200px"
                            ></v-img>

                            <v-card-title>
                                发布临床项目
                            </v-card-title>

                            <v-card-subtitle>
                                借助受试者数据库，大大提高招募效率
                            </v-card-subtitle>

                            <v-card-actions>
                                <router-link
                                        to="/publish"
                                        tag="v-btn"
                                >
                                <v-btn color="teal"  outlined>发布</v-btn>
                                </router-link>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "HomeBackground"
    }
</script>


<style scoped>

    .home-background {
        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        width: 100%;
        height: 100%;
        color:teal;
    }

    .home-background h3 {
        font-size: 40px;
    }

</style>
