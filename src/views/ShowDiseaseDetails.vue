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
            项目名称:{{detailsInfo.programname}}
        </v-alert>
        <v-alert
                dense
                text
                type="success"
        >
            药物:{{detailsInfo.drugname}}
        </v-alert>
        <v-alert
                dense
                text
                type="success"
        >
            适应症:{{detailsInfo.adaptationdisease}}
        </v-alert>
        <v-alert
                dense
                text
                type="success"
        >
            招募人数:{{detailsInfo.totalnumberpeople}}
        </v-alert>
        <v-alert
                dense
                text
                type="success"
        >
            起始日期:{{detailsInfo.starttime}}
        </v-alert>
        <v-alert
                dense
                text
                type="success"
        >
            截止日期:{{detailsInfo.endtime}}
        </v-alert>
            <div class="text-xs-center">
                    <v-btn color="teal" @click="SignMeUp" outlined>我要报名</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "details",
        data(){
            return {
                detailsInfo:''
            }
        },
        mounted() {
            this.axios.post('?',
                {
                    programid:this.$route.params.id,
                    username:this.store.state.username,
                }).
            then((response) =>
            {
                console.log(response);
                this.detailsInfo = response;
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
            }
    }
</script>

<style scoped>
        .v-card {
            padding:25px;
        }
</style>
