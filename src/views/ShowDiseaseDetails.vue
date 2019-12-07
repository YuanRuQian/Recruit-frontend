<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on }">
                <v-btn
                        color="primary"
                        dark
                        v-on="on"
                >
                    Click Me {{this.$route.params.id}}
                </v-btn>
            </template>

            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >

                </v-card-title>

                <v-card-text>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            text
                            @click="SignMeUp"
                    >
                        我要报名
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "details",
        mounted() {
            this.axios.post('?',{ programid:this.$route.params.id}).
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
                    if(response===true) {alert('恭喜您，报名成功！')}
                    else {alert('对不起，报名失败……')}
                })},
            },
            GoBackToLastViewedPage : function () {
                this.$router.go(-1);
            }
    }
</script>

<style scoped>

</style>
