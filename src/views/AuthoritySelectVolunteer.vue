
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
                <v-toolbar-title>选择项目需要的志愿者对象</v-toolbar-title>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">确定对方可以成为志愿者</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <!--             modal 中的内容                   -->
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.calories" label="志愿者编号"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.calories" label="志愿者姓名"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.fat" label="性别"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.carbs" label="年龄"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.carbs" label="疾病类型"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.carbs" label="患病详情"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.carbs" label="地址"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete v-model="editedItem.protein" label="申请状态" :items="ApprovalBindings"></v-autocomplete>
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
            <v-btn color="teal"    @click="editItem(item)" outlined>选择</v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>



<script>
    export default {
        name: "select",
        data () {
            return {
                singleSelect: false,
                ApprovalBindings : ['未审批','审批通过','审批未通过'],
                headers: [
                    { text: '志愿者编号', value: 'volunteernumber' },
                    { text: '志愿者姓名', value: 'volunteername' },
                    { text: '性别', value: 'sex' },
                    { text: '年龄', value: 'age' },
                    { text: '疾病类型', value: 'diseasetypeId' },
                    { text: '患病详情', value: 'diseasedetial' },
                    { text: '地址', value: 'address' },
                    { text: '申请状态', value: 'status' },
                    { text: '志愿者选择', value: 'action', sortable: false },
                ],
                volunteerList :[]
            }
        },
        mounted() {
            this.loadAllVolunteers();
        },
        methods : {
            loadAllVolunteers : function() {
                this.axios.post('${api}/?',
                    {
                        username: this.store.state.username,
                    }).then((response) => {
                    console.log(response);
                    this.volunteerList = response.data;
                });
            },
            birthdayCalculator :function (dob) {
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);
                return Math.abs(age_dt.getUTCFullYear() - 1970);
            },
            submitSelection : function () {
                this.axios.post('${api}/?',
                    {
                        programs : this.selection,

                    }).then((response) => {
                       if(response===true) alert('恭喜您，选择提交成功!');
                       else alert('选择提交失败……');
                       this.$router.go(-1);
                });
            }
        }
    }
</script>

<style scoped>
    .v-card {
        padding: 25px;
        margin: 10px auto auto;

    }

</style>
