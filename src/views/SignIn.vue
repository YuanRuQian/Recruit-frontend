
<template>
    <v-container class="sign-in-background" fluid>
        <v-card class="general-frame">
            <v-toolbar flat color="teal" dark>
                <v-toolbar-title>用户登陆</v-toolbar-title>
            </v-toolbar>

                    <v-card class="tab-card">
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        ref="username"
                                        v-model="username"
                                        label="用户名"
                                        prepend-icon="mdi-star"
                                        type="text"
                                        :rules="[() => !!username || '请填写完整信息!']"
                                        :error-messages="errorMessages"
                                        required
                                />
                                <v-text-field
                                        id="password"
                                        label="密码"
                                        ref="password"
                                        v-model="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        :rules="[() => !!password || '请填写完整信息!']"
                                        :error-messages="errorMessages"
                                        required
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" @click="UserLogIn">登陆</v-btn>
                        </v-card-actions>
                    </v-card>

        </v-card>
        <div id="app">{{info}}</div>
    </v-container>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        name: 'sign-in',
        data () {
            return {
                info: '',
                username: '',
                password: ''
            }

        },
        methods: {
            UserLogIn : function () {


                this.axios.post('http://47.100.227.73:8080/login',{json :
                        {
                            userName: this.username,
                            userPwd: this.password,
                        }}).then((response) => {
                    console.log(response);
                    this.store.state.username = this.username;
                    this.store.state.password = this.password;
                    // 'res':(登陆成功与否 0不存在该用户 1存在该用户密码错误 2登陆成功),
                    // 'type':(登录人员类型（如果登陆失败,type为空,否则type有值 其中 0病人 1健康人 2机构）)
                    switch (parseInt(response)) {
                        case 0 : alert('发布失败 TAT');
                            break;
                        case 1 : alert('发布成功！');
                            break;
                        default : alert('哎呀！出错了 QAQ');
                    }


                });



            }

        }
    }


</script>
<style scoped>
    .general-frame {
        max-width: 60%;
        margin: 5% auto auto;
    }

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
