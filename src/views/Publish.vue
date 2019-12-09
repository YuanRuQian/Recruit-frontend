<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height publish-background"
                    fluid style="max-height: 100vh;"
            >
                <v-card class="general-frame">
                    <v-toolbar flat color="teal" dark>
                        <v-toolbar-title>项目注册</v-toolbar-title>
                    </v-toolbar>

                    <v-card class="tab-card">
                        <v-card-text>
                            <v-form>
                                <v-layout row>
                                    <v-flex md6>
                                        <v-text-field
                                                ref="programName"
                                                v-model="programName"
                                                id="programName"
                                                label="项目名称"
                                                prepend-icon="mdi-star"
                                                type="text"
                                                :rules="[() => !!programName || '请填写完整信息!']"
                                                :error-messages="项目名称错误"
                                                required
                                        />
                                    </v-flex>
                                    <v-flex md6>
                                        <v-text-field
                                                id="drugName"
                                                label="实验药物名称"
                                                ref="drugName"
                                                v-model="drugName"
                                                prepend-icon="mdi-opacity"
                                                type="text"
                                                :rules="[() => !!drugName || '请填写完整信息!']"
                                                :error-messages="实验药物名称出错"
                                                required
                                        />
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex md6>
                                        <v-text-field
                                                id="TotalVolunteers"
                                                label="需要志愿者人数"
                                                ref="TotalVolunteers"
                                                v-model="TotalVolunteers"
                                                prepend-icon="mdi-opacity"
                                                type="number"
                                                :rules="[() => !!TotalVolunteers || '请填写完整信息!']"
                                                :error-messages="需要志愿者人数"
                                                required
                                        />
                                    </v-flex>
                                    <v-flex md6>
                                        <v-autocomplete
                                                id="diseaseType"
                                                label="疾病类型"
                                                ref="diseaseType"
                                                v-model="diseaseType"
                                                :items="allDiseases"
                                                prepend-icon="mdi-circle"
                                                type="text"
                                                :rules="[() => !!diseaseType || '请填写完整信息!']"
                                                :error-messages="疾病类型出错"
                                                required
                                        />
                                    </v-flex>
                                </v-layout>

                                <v-text-field
                                        id="ApplicationDisease"
                                        label="药物的适应症"
                                        ref="ApplicationDisease"
                                        v-model="ApplicationDisease"
                                        prepend-icon="mdi-eye"
                                        type="text"
                                        :rules="[() => !!ApplicationDisease || '请填写完整信息!']"
                                        :error-messages="药物的适应症出错"
                                        required
                                />

                                <v-layout row>
                                    <v-flex md6>
                                        <v-text-field
                                                label="起始时间(mm/dd/yyyy)"
                                                ref="start"
                                                id="start"
                                                v-model="start"
                                                prepend-icon="mdi-calendar"
                                                type="date"
                                                :rules="[() => !!start || '请填写完整信息!']"
                                                :error-messages="errorMessages"
                                                required
                                        />
                                    </v-flex>
                                    <v-flex md6>
                                        <v-text-field
                                                label="结束时间(mm/dd/yyyy)"
                                                ref="end"
                                                id="end"
                                                v-model="end"
                                                prepend-icon="mdi-calendar"
                                                type="date"
                                                :rules="[() => !!end || '请填写完整信息!']"
                                                :error-messages="errorMessages"
                                                required
                                        />
                                    </v-flex>
                                </v-layout>
                                <v-text-field
                                        id="programDetails"
                                        label="项目详情"
                                        ref="programDetails"
                                        v-model="programDetails"
                                        prepend-icon="mdi-eye"
                                        type="text"
                                        :rules="[() => !!programDetails || '请填写完整信息!']"
                                        :error-messages="项目详情出错"
                                        required
                                />

                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" @click="PublishProgram">发布</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-card>


            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "publish",
        data() {
            return {
                programName:'',
                drugName:'',
                diseaseType:0,
                ApplicationDisease:'',
                TotalVolunteers:0,
                start:new Date(),
                end:new Date(),
                programDetails:'',
                allDiseases :['无疾病','某些传染病和寄生虫病','肿瘤' ,'血液及造血器官疾病和某些涉及免疫机制的疾患' ,'内分泌营养和代谢疾病' ,'精神和行为障碍' ,'神经系统疾病','眼和附器疾病','耳和乳突疾病' ,'循环系统疾病' ,'呼吸系统疾病','消化系统疾病' ,'皮肤和皮下组织疾病','肌肉骨骼和结缔组织疾病','泌尿生殖系统疾病','妊娠、分娩和产褥期' ,'起源于围生期的某些情况','先天畸形、变形和染色体异常' ,'不可归他类处' ],
            }
        },
        mounted (){
            // 如果未登陆 跳转登陆页面
            if(this.$store.state.currentUser===null) {this.$router.push({name:'sign-in'})}
            // 如果用户类型错误 跳转对应页面
            if(this.$store.state.currentType===0) {this.$router.push({name:'patient'})}
            if(this.$store.state.currentType===1) {this.$router.push({name:'healthy'})}

        },
        methods :
            {
                PublishProgram: function () {

                    this.axios.post('${api}/project/publish',
                        {
                            username: this.$store.state.username,
                            tblprogram:{
                                programname : this.programName,
                                state:0,
                                // state 默认0 招募中 1 招募已经结束
                                drugname:this.drugName,
                                totalnumberpeople:this.TotalVolunteers,
                                diseasetypeId: this.DiseaseToIndex(this.diseaseType),
                                adaptationdisease:this.ApplicationDisease,
                                starttime:this.start,
                                endtime:this.end,
                                programdetail:this.programDetails
                            }
                        }).then((response) => {
                            console.log(response);
                        //  @return 0发布失败 1发布成功
                        switch (parseInt(response)) {
                            case 0 : alert('发布失败 TAT');
                            break;
                            case 1 : alert('发布成功！');
                            break;
                            default : alert('哎呀！出错了 QAQ');
                        }
                    });
                },

                DiseaseToIndex (value){
                    const bindings = new Map([
                        // tblDiseaseType.json
                        [
                            '某些传染病和寄生虫病',[1]
                        ],
                        [
                            '肿瘤',[2]
                        ],
                        [
                            '血液及造血器官疾病和某些涉及免疫机制的疾患',[3]
                        ],
                        [
                            '内分泌营养和代谢疾病',[4]
                        ],
                        [
                            '精神和行为障碍',[5]
                        ],
                        [
                            '神经系统疾病',[6]
                        ],
                        [
                            '眼和附器疾病',[7]
                        ],
                        [
                            '耳和乳突疾病',[8]
                        ],
                        [
                            '循环系统疾病',[9]
                        ],
                        [
                            '呼吸系统疾病',[10]
                        ],
                        [
                            '消化系统疾病',[11]
                        ],
                        [
                            '皮肤和皮下组织疾病',[12]
                        ],
                        [
                            '肌肉骨骼和结缔组织疾病',[13]
                        ],
                        [
                            '泌尿生殖系统疾病',[14]
                        ],
                        [
                            '妊娠、分娩和产褥期',[15]
                        ],
                        [
                            '起源于围生期的某些情况',[16]
                        ],
                        [
                            '先天畸形、变形和染色体异常',[17]
                        ],
                        [
                            '不可归他类处',[18]
                        ]

                    ]);

                    let binding = bindings.get(value);
                    return binding[0];

                }
            }


    }


</script>

<style scoped>
    .general-frame {
        margin: 5% auto auto;
        width: 60%;
    }

    .publish-background {
        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
