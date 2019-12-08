<template>
    <v-data-table
            v-model="selected"
            :headers="headers"
            :items="selection"
            :single-select="singleSelect"
            item-key="name"
            show-select
            class="elevation-1"
            loading loading-text="数据加载中……请耐心等待"
    >
        <template v-slot:top>
            <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        </template>
    </v-data-table>
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
                    // 没想好生日怎么在此处转化为年龄
                    { text: '年龄', value: 'age' },
                    { text: '疾病类型', value: 'diseasetypeId' },
                    { text: '患病详情', value: 'diseasedetial' },
                    { text: '地址', value: 'address' },
                ],
                selection : [

                ],
            }
        },
        methods : {
            birthdayCalculator :function (dob) {
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);
                return Math.abs(age_dt.getUTCFullYear() - 1970);
            },
        }
    }
</script>

<style scoped>
    .v-card {
        padding: 25px;
        margin: 10px auto auto;

    }
</style>
