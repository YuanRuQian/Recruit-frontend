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
                                <v-text-field
                                        id="clinicalState"
                                        label="临床试验状态"
                                        ref="clinicalState"
                                        v-model="clinicalState"
                                        prepend-icon="mdi-hospital"
                                        type="text"
                                        :rules="[() => !!clinicalState || '请填写完整信息!']"
                                        :error-messages="临床试验状态出错"
                                        required
                                />
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
                                <v-text-field
                                        id="diseaseType"
                                        label="疾病类型"
                                        ref="diseaseType"
                                        v-model="diseaseType"
                                        prepend-icon="mdi-circle"
                                        type="text"
                                        :rules="[() => !!diseaseType || '请填写完整信息!']"
                                        :error-messages="疾病类型出错"
                                        required
                                />
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
        methods :
            {
                PublishProgram: function () {

                    this.axios.post('${api}/publish',
                        {
                            json :
                                {
                                    userName: this.store.state.username,
                                    ProgramName : this.programName,
                                    State:this.ClinicalState,
                                    DrugName:this.drugName,
                                    DiseaseType:this.diseaseType,
                                    AdaptationDisease:this.ApplicationDisease,
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
        background: url('../assets/publish-background.jpg');
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
