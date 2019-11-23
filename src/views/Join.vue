<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height join-background"
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
                                <v-toolbar-title>注册</v-toolbar-title>
                                <v-spacer />

                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-layout row>
                                        <v-flex md6>
                                    <v-text-field
                                            id="userName"
                                            label="用户名"
                                            name="userName"
                                            prepend-icon="mdi-face"
                                            type="text"
                                    />
                                        </v-flex>
                                        <v-flex md6>
                                    <v-text-field
                                            id="name"
                                            label="真实姓名"
                                            name="name"
                                            prepend-icon="mdi-face"
                                            type="text"
                                    />
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex md6>
                                    <v-text-field
                                            id="sex"
                                            label="性别"
                                            name="sex"
                                            prepend-icon="mdi-face"
                                            type="text"
                                    />
                                        </v-flex>
                                        <v-flex md6>
                                    <v-text-field
                                            id="age"
                                            label="年龄"
                                            name="age"
                                            prepend-icon="mdi-star"
                                            type="text"
                                    />
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex md6>
                                    <v-text-field
                                            id="type"
                                            label="类型"
                                            name="type"
                                            prepend-icon="mdi-star"
                                            type="text"
                                    />
                                        </v-flex>
                                        <v-flex md6>
                                    <v-text-field
                                            id="disease"
                                            label="所患疾病"
                                            name="disease"
                                            prepend-icon="mdi-star"
                                            type="text"
                                    />
                                        </v-flex>
                                    </v-layout>

                                <v-layout row>
                                    <v-flex md6>
                                    <v-text-field
                                            id="tel"
                                            label="联系方式"
                                            name="tel"
                                            prepend-icon="mdi-home"
                                            type="text"
                                    />
                                    </v-flex>
                                    <v-flex md6>
                                    <v-text-field
                                            id="address"
                                            label="地址"
                                            name="address"
                                            prepend-icon="mdi-home"
                                            type="text"
                                    />
                                    </v-flex>
                                </v-layout>
                                    <v-layout row>
                                        <v-flex md12>
                                            <v-text-field
                                                    id="password"
                                                    label="密码"
                                                    name="password"
                                                    prepend-icon="mdi-lock"
                                                    type="password"
                                            />
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="teal" class="white--text">注册</v-btn>
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
        name: 'join'
    };
</script>
<style scoped>

    .join-background {
        background: url('../assets/join-background.jpg');
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

    .v-icon i {
        color: rgba(0,0,0,0.54);
    }

</style>
