<template>
    <v-app id="inspire"  >
        <v-content>
            <v-container
                    class="fill-height select-background"
                    fluid
            >
                <v-container fluid>
                    <v-card>
                        <v-card-title>
                            项目申请者一览
                            <v-spacer></v-spacer>
                            <v-text-field
                                    v-model="search"
                                    label="输入相关信息查找志愿者"
                                    single-line
                                    hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                                :headers="headers"
                                :items="volunteersList"
                                sort-by="diseasetypeId"
                                class="elevation-1"
                                :search="search"
                                loading-text="数据加载中……请耐心等待"
                        >
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-dialog v-model="dialog" max-width="500px">
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">批准申请</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <!--             modal 中的内容                   -->
                                                    <v-row>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.volunteernumber" label="志愿者编号"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.volunteername" label="志愿者姓名"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.sex" label="性别"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.birthday" label="年龄"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.adaptationdisease" label="适应症"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.totalnumberpeople" label="招募人数"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.starttime" label="起始日期"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly  v-model="editedItem.endtime" label="截止日期"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly  v-model="editedItem.programdetail" label="项目详情"></v-text-field>
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
                            <template v-slot:item.action="{ item }" v-if="item.state===true">
                                <v-btn else color="teal" disabled="true" outlined>已报名</v-btn>
                            </template>
                            <template v-slot:item.action="{ item }" v-else>
                                <v-btn else color="teal" @click="editItem(item)" outlined>报名</v-btn>
                            </template>

                        </v-data-table>
                    </v-card>
                </v-container>
            </v-container>
        </v-content>
    </v-app>
</template>



<script>
    export default {
        name: "select",
        data () {
            return {
                singleSelect: false,
                volunteersList:[],
                ApprovalBindings : ['未审批','审批通过','审批未通过'],
                headers: [
                    { text: '志愿者编号', value: 'volunteernumber' },
                    { text: '志愿者姓名', value: 'volunteername' },
                    { text: '性别', value: 'sex' },
                    { text: '年龄', value: 'birthday' },
                    { text: '疾病类型', value: 'diseasetypeId' },
                    { text: '患病详情', value: 'diseasedetial' },
                    { text: '地址', value: 'address' },
                    { text: '申请状态', value: 'status' },
                    { text: '批准', value: 'action', sortable: false },
                ],
                volunteerList :[],
                editedIndex: -1,
                editedItem: {
                    id: 0,
                },
                defaultItem: {
                    id:0,
                },
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        mounted() {
            this.axios.post('http://47.100.227.73:8080/recruit/api/project/manageVolunteers',
                {programnumberId:this.$route.params.programid}).then((response) => {
                console.log(response.data);
                this.volunteersList=response.data;
                this.volunteersList.forEach(element =>element.birthday=this.IndexToDisease(element.birthday));
                this.programList.forEach(element =>element.diseasetypeId=this.birthdayCalculator(element.diseasetypeId));
            });
        },

        methods : {
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

                const binding = bindings.get(value);
                return binding[0];

            },

            birthdayCalculator :function (dob) {
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);
                return Math.abs(age_dt.getUTCFullYear() - 1970);
            },

            editItem (item) {
                this.editedIndex = this.programList.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },


            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.programList[this.editedIndex], this.editedItem)
                } else {
                    this.programList.push(this.editedItem)
                }


                    this.axios.post('http://47.100.227.73:8080/recruit/api/project/filter',
                        {
                            programnumberId:this.$route.params.programid,
                            volunteernumberId: this.editedItem.volunteernumber,
                            applystate:1,

                        }).then((response) => {
                        if(response===true) alert('恭喜您，选择提交成功!');
                        else alert('选择提交失败……');
                        this.$router.go(-1);
                    });

                this.close()
            },
        },
    }
</script>

<style scoped>

    .select-background {
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
