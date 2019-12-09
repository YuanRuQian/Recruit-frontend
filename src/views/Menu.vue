<template>
    <v-container fluid>
    <v-data-table
            :headers="headers"
            :items="programList"
            sort-by="calories"
            class="elevation-1"
            loading-text="数据加载中……请耐心等待"
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
            <v-btn color="teal"    @click="editItem(item)" outlined>报名</v-btn>
        </template>

    </v-data-table>
    </v-container>
</template>



<script>

    export default {
        name: 'menu',
        data: () => ({
            dialog: false,
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

                this.axios.get('http://47.100.227.73:8080/recruit/api/project/getall').then((response) => {
                    console.log(response.data);
                    this.programList=response.data;
                    this.programList.forEach(element=> console.log(element.diseasetypeId=this.IndexToDisease(element.diseasetypeId)))


                });

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

                let binding = bindings.get(value);
                return binding[0];

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
                this.axios.post('',
                    {
                        id: this.editedItem.id,
                        username:this.$store.state.currentUser,

                    }).then((response) => {
                    console.log(response.data);
                    alert('恭喜您报名成功!');
                });
                this.close()
            },
        },
    }
</script>



