<!--志愿者个人中心主页 先加载志愿者申请的所有项目-->
<template>
    <v-app id="inspire"  >
        <v-content>
            <v-container
                    class="fill-height volunteer-table-background"
                    fluid
            >
                <v-card>
                    <v-card-title>
                        您申请的所有项目
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                label="输入相关信息查找项目"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="programList"
                            :search="search"
                    ></v-data-table>
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
                search:'',
                programList:[],
                headers: [
                    { text: '项目ID', value: 'id' },
                    { text: '项目名称', value: 'programname' },
                    { text: '药物', value: 'drugname' },
                    { text: '疾病类型', value: 'diseasetypeId' },
                    { text: '适应症', value: 'adaptationdisease' },
                    { text: '招募人数', value: 'totalnumberpeople' },
                    { text: '起始日期', value: 'starttime' },
                    { text: '截止日期', value: 'endtime' },
                    { text: '项目详情', value: 'programdetail' },
                    { text: '审核情况', value: 'status' },
                ],
            }
        },
        mounted() {
            // 如果未登陆 跳转登陆页面
            if(this.$store.state.currentUser===null) {this.$router.push({name:'sign-in'})}

            // 如果用户类型错误 跳转对应页面
            if(this.$store.state.currentType===2) {this.$router.push({name:'authority-table'})}

            console.log(this.$store.state.currentUser);
            this.axios.post('http://47.100.227.73:8080/recruit/api/project/status',
                {
                    username:this.$store.state.currentUser
                }).then((response) => {
                console.log(response.data);
                this.programList=response.data;
                this.programList.forEach(element =>element.diseasetypeId=this.IndexToDisease(element.diseasetypeId));
                this.programList.forEach(element =>element.status=this.IndexToStatus(element.status));
            });


        },
        methods: {
            // 只传 username
            IndexToStatus(value) {
                const bindings = new Map([
                    [0, ['未审批']],
                    [1, ['审批通过']],
                    [2, ['审批未通过']]
                ]);
                const binding = bindings.get(value);
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

                const binding = bindings.get(value);
                return binding[0];

            },


        }
    }
</script>

<style scoped>

    .volunteer-table-background {
        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        width:100%;
        height: 100%;
        color:teal;
    }
    .v-card {
        width: 99%;
        margin:auto;
    }
    a {
        color: white ;
        text-decoration: none;
        font-weight: bold;
    }
</style>
