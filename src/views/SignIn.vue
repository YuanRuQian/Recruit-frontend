
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
                            {{prompt}}
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
                password: '',
                prompt:''
            }

        },
        methods: {
            UserLogIn : function () {


                this.axios.post('/api/login',
                        {
                            username: this.username,
                            userpwd: this.password,
                        }).then((response) => {

                    console.log(response);

                    // 'res':(登陆成功与否 0不存在该用户 1存在该用户密码错误 2登陆成功),
                    // 'type':(登录人员类型（如果登陆失败,type为空,否则type有值 其中 0病人 1健康人 2机构）)


                    // prompt 用于记录登陆成功与否/登陆人员类型 将显示在弹窗里


                    // 若登陆成功，跳转到用户身份对应的页面

                    if(parseInt(response.data.res)===2)
                    {
                        this.$store.state.currentUser = this.username;
                        this.$store.state.currentType=response.data.type;
                        switch (parseInt(response.data.type)) {
                            case 0 : this.$router.push({name:'patient'});
                                break;
                            case 1 : this.$router.push({name:'healthy'});
                                break;
                            case 2 : this.$router.push({name:'publish'});
                                break;
                        }

                    }
                    else
                        {
                            switch (parseInt(response.data.res)) {
                                case 0 : this.prompt+='不存在该用户 δ(´д｀; )';
                                    break;
                                case 1 : this.prompt+='用户密码错误 (-_-)ゞ゛';
                                    break;
                            }
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
        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
