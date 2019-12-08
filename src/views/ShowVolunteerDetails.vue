
<template>
    <div>
        <v-card
                class="mx-auto"
                max-width="80%"
        >
            <v-alert
                    dense
                    text
                    type="success"
            >
                志愿者编号:{{volunteerInfo.volunteernumber}}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                志愿者姓名:{{volunteerInfo.volunteername}}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                性别 :{{volunteerInfo.sex}}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                年龄:{{volunteerInfo.birthday | birthdayCalculator}}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                疾病类型 :{{volunteerInfo.diseasetypeId | IndexToDisease }}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                患病详情:{{volunteerInfo.diseasedetial}}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                地址:{{volunteerInfo.address}}
            </v-alert>

            <div class="text-xs-center">
                <v-btn color="teal" @click="PickingUp" outlined>通过</v-btn>
            </div>
            <div class="text-xs-center">
                <v-btn color="teal" @click="NotPickingUp" outlined>不通过</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "volunteer",
        data(){
            return {
                volunteerInfo:'',
                isApproved : null //用于记录是否被批准
            }
        },
        filters : {
            birthdayCalculator :function (dob) {
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);
                return Math.abs(age_dt.getUTCFullYear() - 1970);
            },
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
        mounted() {
            this.axios.post('?',
                {
                    username:this.store.state.username,
                }).
            then((response) =>
            {
                console.log(response);
                this.volunteerInfo = response;
            })},
        methods : {
            PickingUp : function () {
                this.PickingUpSendingData();
                this.GoBackToLastViewedPage();
            },
            NotPickingUp : function () {
                this.NotPickingUpSendingData();
                this.GoBackToLastViewedPage();
            },
            PickingUpSendingData : function (){
                // aproved=0 不同意 aproved=1 同意
                this.axios.post('?',{ programid:this.$route.params.id,username:this.store.state.username,approved:1}).
                then((response) =>
                {
                    console.log(response);
                })},
            NotPickingUpSendingData : function (){
                // aproved=0 不同意 aproved=1 同意
                this.axios.post('?',{ programid:this.$route.params.id,username:this.store.state.username,approved:0}).
                then((response) =>
                {
                    console.log(response);
                })},
        },
        GoBackToLastViewedPage : function () {
            this.$router.go(-1);
        },


    }
</script>

<style scoped>
    .v-card {
        padding: 25px;
        margin: 10px auto auto;

    }

</style>
