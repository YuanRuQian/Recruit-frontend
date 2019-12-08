<template>
    <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
            loading loading-text="数据加载中……请耐心等待"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>健康受试者项目一览</v-toolbar-title>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">我要报名</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <!--             modal 中的内容                   -->
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.calories" label="项目名称"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.calories" label="药物"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.fat" label="适应症"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.carbs" label="招募人数"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.protein" label="起始日期"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.protein" label="截止日期"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="teal" outlined @click="close">取消</v-btn>
                            <v-btn color="teal" outlined @click="save">确认</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-btn color="teal"    @click="editItem(item)" outlined>我要报名</v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

    export default {
        name: "healthy",
        data () {
            return {
                search: '',
                info:[],
                headers: [
                    { text: '项目名称', value: '' },
                    { text: '药物', value: '' },
                    { text: '适应症', value: '' },
                    { text: '招募人数', value: '' },
                    { text: '起始日期', value: '' },
                    { text: '截止日期', value: '' },
                    { text: '我要报名', value: 'action', sortable: false },
                ],
            }
        },

        computed: {
            formTitle () {
                return '';
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },
        filters: {
            IndexToDisease (value){

                const bindings = new Map([
                    // tblDiseaseType.json
                    [
                        0,['无疾病']
                    ],
                    [
                        1,['某些传染病和寄生虫病']
                    ],
                    [
                        2,['肿瘤']
                    ],
                    [
                        3,['血液及造血器官疾病和某些涉及免疫机制的疾患']
                    ],
                    [
                        4,['内分泌营养和代谢疾病']
                    ],
                    [
                        5,['精神和行为障碍']
                    ],
                    [
                        6,['神经系统疾病']
                    ],
                    [
                        7,['眼和附器疾病']
                    ],
                    [
                        8,['耳和乳突疾病']
                    ],
                    [
                        9,['循环系统疾病']
                    ],
                    [
                        10,['呼吸系统疾病']
                    ],
                    [
                        11,['消化系统疾病']
                    ],
                    [
                        12,['皮肤和皮下组织疾病']
                    ],
                    [
                        13,['肌肉骨骼和结缔组织疾病']
                    ],
                    [
                        14,['泌尿生殖系统疾病']
                    ],
                    [
                        15,['妊娠、分娩和产褥期']
                    ],
                    [
                        16,['起源于围生期的某些情况']
                    ],
                    [
                        17,['先天畸形、变形和染色体异常']
                    ],
                    [
                        18,['不可归他类处']
                    ]

                ]);

                let binding = bindings.get(value);
                return binding[0];

            }
        },

        methods: {
            initialize () {
                this.axios.post('${api}/publish',
                    {
                        userName: this.store.state.username,
                        userPwd: this.store.state.password,
                        ProgramName : this.programName,
                        State:this.ClinicalState,
                        DrugName:this.drugName,
                        DiseaseType:this.diseaseType,
                        AdaptationDisease:this.ApplicationDisease,

                    }).then((response) => {
                    console.log(response);
                    this.info=response.data;
                    //  @return 0发布失败 1发布成功
                    switch (parseInt(response.data)) {
                        case 0 : alert('发布失败 TAT');
                            break;
                        case 1 : alert('发布成功！');
                            break;
                        default : alert('哎呀！不知道哪里出错了 QAQ');
                    }
                });
            },

        }
    }
</script>


<style scoped>

    .v-data-table{
        width: 80%;
        margin: auto;
    }


    .healthy-background {
        background: url('../assets/healthy-background.jpg');
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
