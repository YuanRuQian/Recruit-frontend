<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height sign-in-background"
                    fluid style="max-height: 100vh;"
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="teal"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>登陆</v-toolbar-title>
                                <v-spacer />

                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            id="username"
                                            label="用户名"
                                            name="login"
                                            prepend-icon="mdi-face"
                                            type="text"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="密码"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="teal" class="white--text">登陆</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>


<script>
    export default {
        props: {
            source: String,
        },
        name: 'sign-in'
    };
</script>
<style scoped>
    .sign-in-background {
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
