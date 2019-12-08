<template>
    <v-container fluid>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="volunteerList"
                    item-key="name"
                    show-select
                    class="elevation-1"
                    loading loading-text="数据加载中……请耐心等待"
            >

            </v-data-table>
            <v-btn color="teal" @click="submitSelection" outlined>提交我的选择</v-btn>
    </v-container>
</template>



<script>
    export default {
        name: "select",
        data () {
            return {
                singleSelect: false,
                selected: [],
                age : 0,
                headers: [
                    { text: '志愿者编号', value: 'volunteernumber' },
                    { text: '志愿者姓名', value: 'volunteername' },
                    { text: '性别', value: 'sex' },
                    { text: '年龄', value: 'age' },
                    { text: '疾病类型', value: 'diseasetypeId' },
                    { text: '患病详情', value: 'diseasedetial' },
                    { text: '地址', value: 'address' },
                ],
                selection : [],
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
                        programs : this.selection
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
