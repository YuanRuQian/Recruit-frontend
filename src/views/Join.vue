
<template>
    <v-container class="join-background" fluid style="max-height: 100%;">
    <v-card class="general-frame">
        <v-toolbar flat color="teal" dark>
            <v-toolbar-title>注册{{this.$route.params.id}}</v-toolbar-title>
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

                            <v-autocomplete
                                    label="所患疾病类型"
                                    ref="disease"
                                    id="disease"
                                    v-model="disease"
                                    :items ="allDiseases"
                                    prepend-icon="mdi-opacity"
                                    type="text"
                                    :rules="[() => !!disease || '请填写完整信息!']"
                                    :error-messages="errorMessages"
                                    required
                            />

                            <v-text-field
                                    label="所患疾病细节"
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
<!--                        {{birthday}}-->
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
        props :{
            id : String,
        },
        data: () => ({

            gender: ['男', '女', '其他'],
            provinces: ['北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'],
            allDiseases :['无疾病','某些传染病和寄生虫病','肿瘤' ,'血液及造血器官疾病和某些涉及免疫机制的疾患' ,'内分泌营养和代谢疾病' ,'精神和行为障碍' ,'神经系统疾病','眼和附器疾病','耳和乳突疾病' ,'循环系统疾病' ,'呼吸系统疾病','消化系统疾病' ,'皮肤和皮下组织疾病','肌肉骨骼和结缔组织疾病','泌尿生殖系统疾病','妊娠、分娩和产褥期' ,'起源于围生期的某些情况','先天畸形、变形和染色体异常' ,'不可归他类处' ],
        }),
        filters: {
            DiseaseToIndex(value) {
                const bindings = new Map([
                    // tblDiseaseType.json
                    [
                        '无疾病', [0]
                    ],
                    [
                        '某些传染病和寄生虫病', [1]
                    ],
                    [
                        '肿瘤', [2]
                    ],
                    [
                        '血液及造血器官疾病和某些涉及免疫机制的疾患', [3]
                    ],
                    [
                        '内分泌营养和代谢疾病', [4]
                    ],
                    [
                        '精神和行为障碍', [5]
                    ],
                    [
                        '神经系统疾病', [6]
                    ],
                    [
                        '眼和附器疾病', [7]
                    ],
                    [
                        '耳和乳突疾病', [8]
                    ],
                    [
                        '循环系统疾病', [9]
                    ],
                    [
                        '呼吸系统疾病', [10]
                    ],
                    [
                        '消化系统疾病', [11]
                    ],
                    [
                        '皮肤和皮下组织疾病', [12]
                    ],
                    [
                        '肌肉骨骼和结缔组织疾病', [13]
                    ],
                    [
                        '泌尿生殖系统疾病', [14]
                    ],
                    [
                        '妊娠、分娩和产褥期', [15]
                    ],
                    [
                        '起源于围生期的某些情况', [16]
                    ],
                    [
                        '先天畸形、变形和染色体异常', [17]
                    ],
                    [
                        '不可归他类处', [18]
                    ]

                ]);

                let binding = bindings.get(value);
                return binding[0];
              }
            },

            methods: {


                UserRegister: function () {



                    this.axios.post('register/volunteer',
                        {
                            username: this.username,
                            userpwd: this.password,
                            tblvolunteer : {
                                volunteername: this.realname,
                                sex: this.gender,
                                birthday: this.birthday,
                                diseasetypeId: this.$options.filters.DiseaseToIndex(this.disease),
                                diseasedetial: this.diseasedetail,
                                tel: this.tel,
                                address: this.address
                            }
                        }
                    ).then((response) => {
                        this.info = response;
                        switch ( this.$options.filters.DiseaseToIndex(this.disease))
                        {
                            case 0: this.$router.push('healthy');break;
                            default : this.$router.push('patient');break;
                        }
                    });
                },

                AuthorityRegister: function () {
                    this.axios.get('?',
                        {
                            userName: this.username2,
                            userPwd: this.password2,
                            Organization: this.authority,
                            Tel: this.tel2,
                        }
                    ).then((response) => {
                        this.currentType = response;
                        this.$router.push({name:'publish'});
                    });
                },
            },
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
