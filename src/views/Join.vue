
<template>
    <v-container class="join-background" fluid style="max-height: 100%;">
    <v-card class="general-frame">
        <v-toolbar flat color="teal" dark>
            <v-toolbar-title>注册</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-account</v-icon>
                志愿者
            </v-tab>
            <v-tab>
                <v-icon left>mdi-hospital</v-icon>
                发布机构
            </v-tab>

            <v-tab-item>
                <v-card class="tab-card">
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    ref="username"
                                    v-model="username"
                                    id="username"
                                    label="用户名"
                                    prepend-icon="mdi-star"
                                    type="text"
                                    :rules="[() => !!username || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />
                            <v-text-field
                                    ref="realname"
                                    v-model="realname"
                                    id="realname"
                                    label="真实姓名"
                                    prepend-icon="mdi-file"
                                    type="text"
                                    :rules="[() => !!realname || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-autocomplete
                                    ref="gender"
                                    v-model="gender"
                                    id="gender"
                                    label="性别"
                                    prepend-icon="mdi-heart"
                                    :rules="[() => !!gender || '请选择您的性别！']"
                                    :items="gender"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-text-field
                                    label="出生日期 (mm/dd/yyyy)"
                                    ref="birthday"
                                    id="birthday"
                                    v-model="birthday"
                                    prepend-icon="mdi-calendar"
                                    type="date"
                                    :rules="[() => !!birthday || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-text-field
                                    label="所患疾病"
                                    ref="disease"
                                    id="disease"
                                    v-model="disease"
                                    prepend-icon="mdi-opacity"
                                    type="text"
                                    :rules="[() => !!disease || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-text-field
                                    label="所患疾病"
                                    ref="diseasedetail"
                                    id="diseasedetail"
                                    v-model="diseasedetail"
                                    prepend-icon="mdi-camera"
                                    type="text"
                                    :rules="[() => !!diseasedetail || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-text-field
                                    label="电话"
                                    ref="tel"
                                    id="tel"
                                    v-model="tel"
                                    prepend-icon="mdi-phone"
                                    type="text"
                                    :rules="[() => !!tel || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-autocomplete
                                    label="所在省份"
                                    ref="address"
                                    id="address"
                                    v-model="address"
                                    :items="provinces"
                                    prepend-icon="mdi-home"
                                    type="text"
                                    :rules="[() => !!address || '请填写完整信息!']"
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
                        <v-btn color="primary" @click="UserRegister">注册</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>


            <v-tab-item>


                <v-card class="tab-card">
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    ref="username2"
                                    v-model="username2"
                                    id="username2"
                                    label="用户名"
                                    prepend-icon="mdi-star"
                                    type="text"
                                    :rules="[() => !!username2 || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />
                            <v-text-field
                                    ref="organization"
                                    v-model="organization"
                                    label="机构名称"
                                    prepend-icon="mdi-file"
                                    type="text"
                                    :rules="[() => !!organization || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />
                            <v-text-field
                                    label="电话"
                                    ref="tel2"
                                    id="tel2"
                                    v-model="tel2"
                                    prepend-icon="mdi-phone"
                                    type="text"
                                    :rules="[() => !!tel || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />
                            <v-text-field
                                    id="password2"
                                    label="密码"
                                    ref="password2"
                                    v-model="password2"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :rules="[() => !!password2 || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="AuthorityRegister">注册</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>





        </v-tabs>
    </v-card>
    </v-container>
</template>


<script>
    export default {
        name: 'join',
        data: () => ({
            gender: ['男', '女', '其他'],
            provinces: ['北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'],

        }),
        methods: {
            UserRegister: function ur(event) {
                event.preventDefault();

                this.axios.post('http://47.100.227.73:8080/register/volunteer',
                    {
                        params:
                            {
                                register :
                                    {
                                        userName : this.username,
                                        userPwd : this.password,
                                        VolunteerName:this.realname,
                                        Sex:this.gender,
                                        Birthday:this.birthday,
                                        DiseaseType:this.disease,
                                        DiseaseDetial:this.diseasedetail,
                                        Tel:this.tel,
                                        Address:this.address
                                    }
                            }
                    }).then((response) => {
                    this.info=response
                });
            },

        AuthorityRegister: function () {
        this.axios.get('?',
            {
                register :
                    {
                        userName : this.username2,
                        userPwd : this.password2,
                        Organization: this.authority,
                        Tel:this.tel2,
                    }

            }).then((response) => {
            this.currentType = response;
            switch (parseInt(this.currentType)) {
                case 0 : alert('登陆失败!');
                break;
                case 1 : alert('欢迎您！志愿者！');
                break;
                case 2 : alert('欢迎您！发布机构！');
                break;
                default : alert('哎呀！有东西出错了 QAQ')

            }
        });
    },
        }
    }


</script>
<style scoped>

    .general-frame {
        max-width: 60%;
        margin:auto;
    }

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


</style>
