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
                年龄:{{volunteerInfo.birthday}}
            </v-alert>
            <v-alert
                    dense
                    text
                    type="success"
            >
                地址:{{volunteerInfo.address}}
            </v-alert>

            <div class="text-xs-center">
                <v-btn color="teal" @click="SignMeUp" outlined>我要报名</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "volunteer",
        data(){
            return {
                volunteerInfo:''
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
            SignMeUp : function () {
                this.ShowMeFeedback();
                this.GoBackToLastViewedPage();
            },
            ShowMeFeedback : function (){
                this.axios.post('?',{ programid:this.$route.params.id,username:this.store.state.username}).
                then((response) =>
                {
                    if(response.data===true) {alert('恭喜您，报名成功！')}
                    else {alert('对不起，报名失败……')}
                })},
        },
        GoBackToLastViewedPage : function () {
            this.$router.go(-1);
        },
        // 通过生日计算年龄
        calculate_age : function (dob) {
            var diff_ms = Date.now() - dob.getTime();
            var age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        }
    }
</script>

<style scoped>

</style>
