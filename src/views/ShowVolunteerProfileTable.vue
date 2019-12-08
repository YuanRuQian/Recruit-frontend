<template>
    <v-app id="inspire"  >
        <v-content>
            <v-container
                    class="fill-height patient-background"
                    fluid
            >
                <v-card class="patient-data-table">
                    <v-card-title>
                        您的相关项目
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="programList"
                            class="elevation-1"
                            loading loading-text="数据加载中……请耐心等待"
                    >
                    </v-data-table>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "volunteer-table",
        data() {
            return {
                programList:[],
                headers: [
                    {text: '项目名称', value: ''},
                    {text: '药物', value: ''},
                    {text: '适应症', value: ''},
                    {text: '招募人数', value: ''},
                    {text: '起始日期', value: ''},
                    {text: '截止日期', value: ''},
                    {text: '申请状态', value: ''},
                ],
            }
        },
        filters: {
            // 数字 转化为状态
            IndexToState(value) {
                const bindings = new Map([
                    [0, ['未审批']],
                    [1, ['审批通过']],
                    [2, ['审批未通过']]
                ]);
                let binding = bindings.get(value);
                return binding[0];
            },
            IndexToDisease(value) {

                const bindings = new Map([
                    // tblDiseaseType.json
                    [
                        0, ['无疾病']
                    ],
                    [
                        1, ['某些传染病和寄生虫病']
                    ],
                    [
                        2, ['肿瘤']
                    ],
                    [
                        3, ['血液及造血器官疾病和某些涉及免疫机制的疾患']
                    ],
                    [
                        4, ['内分泌营养和代谢疾病']
                    ],
                    [
                        5, ['精神和行为障碍']
                    ],
                    [
                        6, ['神经系统疾病']
                    ],
                    [
                        7, ['眼和附器疾病']
                    ],
                    [
                        8, ['耳和乳突疾病']
                    ],
                    [
                        9, ['循环系统疾病']
                    ],
                    [
                        10, ['呼吸系统疾病']
                    ],
                    [
                        11, ['消化系统疾病']
                    ],
                    [
                        12, ['皮肤和皮下组织疾病']
                    ],
                    [
                        13, ['肌肉骨骼和结缔组织疾病']
                    ],
                    [
                        14, ['泌尿生殖系统疾病']
                    ],
                    [
                        15, ['妊娠、分娩和产褥期']
                    ],
                    [
                        16, ['起源于围生期的某些情况']
                    ],
                    [
                        17, ['先天畸形、变形和染色体异常']
                    ],
                    [
                        18, ['不可归他类处']
                    ]

                ]);

                let binding = bindings.get(value);
                return binding[0];

            }
        }, mounted() {
            this.showProgramProfile();

        },
        methods: {
            // 只传 username

            showProgramProfile : function ()  {
                this.axios.post('${api}/?',
                    {
                                username: this.store.state.username,


                    }).then((response) => {
                    console.log(response);
                    this.programList = response.data;
                });
            }

        }
    }
</script>

<style scoped>

</style>
