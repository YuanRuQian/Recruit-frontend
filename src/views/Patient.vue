<template>
    <v-app id="inspire"  >
        <v-content>
            <v-container
                    class="fill-height patient-background"
                    fluid
            >
                <v-container fluid>
                    <v-card>
                        <v-card-title>
                            患者受试者项目一览
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
                                sort-by="calories"
                                class="elevation-1"
                                :search="search"
                                loading-text="数据加载中……请耐心等待"
                        >
                            <template v-slot:top>
                                <v-toolbar flat color="white">
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
                                                            <v-text-field readonly   v-model="editedItem.id" label="项目ID"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.programname" label="项目名称"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.drugname" label="药物"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field readonly   v-model="editedItem.diseasetypeId" label="疾病类型"></v-text-field>
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
                            <template v-slot:item.action="{ item }">
                                <v-btn color="teal"    @click="editItem(item)" outlined>{{item.type | filter1}}</v-btn>
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
        name: 'healthy',
        data: () => ({
            dialog: false,
            search:'',
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
                { text: '我要报名', value: 'action', sortable: false },
            ],
            programList: [
            ],
            programArr: [
            ],
            editedIndex: -1,
            editedItem: {
                id: 0,
            },
            defaultItem: {
                id:0,
            },
        }),


        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        mounted () {
            // 如果未登录 显示全部项目 否则 仅显示未报名的项目
            if(this.$store.state.currentUser===null)
            {
                this.axios.get('http://47.100.227.73:8080/recruit/api/project/getall').then((response) => {
                    console.log(response.data);
                    this.programList=response.data;
                    this.programList.forEach(element =>element.diseasetypeId=this.IndexToDisease(element.diseasetypeId));

                });
            }
            else
            {
                // 如果用户类型错误 跳转对应页面
                if(this.$store.state.currentType===1) {this.$router.push({name:'healthy'})}
                if(this.$store.state.currentType===2) {this.$router.push({name:'publish'})}
                // 显示本人未报名的项目
                this.axios.post('http://47.100.227.73:8080/recruit/api/project/getallbyvo',{username:this.$store.state.currentUser}).then((response) => {
                    console.log(response.data);
                    this.programList=response.data;
                });

            }

        },
        filters:{
            filter1:function (value) {
                if(value===false){
                    return "报名";
                }else if (value === true){
                    return "已报名";
                }else {
                    return"报名";
                }
            }
        },
        methods: {
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
            editItem (item) {
                this.editedIndex = this.programList.indexOf(item);
                this.editedItem = Object.assign({}, item);
                if(item.type === true){
                    this.dialog = false;
                }
                else {
                    this.dialog = true;
                }
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

                // 如果未登录 跳转登录页面
                if(this.$store.state.currentUser===null) {this.$router.push({name:'sign-in'})}


                this.axios.post('http://47.100.227.73:8080/recruit/api/project/application',
                    {
                        programnumber_id: this.editedItem.id,
                        username:this.$store.state.currentUser,

                    }).then((response) => {

                    if(response.data===true) {

                        this.axios.post('http://47.100.227.73:8080/recruit/api/project/getallbyvo',{username:this.$store.state.currentUser}).then((response) => {
                            console.log(response.data);
                            this.programList=response.data;
                        });
                        alert('恭喜您报名成功!');

                    }
                    else {alert('哪里出错了 QAQ')}
                });
                this.close()
            },
        },
    }
    </script>


<style scoped>

    .patient-data-table{
        width: 80%;
        margin: auto;
    }

    .patient-background {
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
