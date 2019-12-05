<template>
    <v-app id="inspire" @load="ProgramForHealthy">
        <v-content>
            <v-container
                    class="fill-height healthy-background"
                    fluid
            >
                <v-card>
                    <div
                            v-for="currency in info"
                            class="currency"
                            v-bind:key="currency.id"
                    >
                        {{ currency.description }}:
                        <span class="lighten">
      <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
    </span>
                    </div>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: "healthy",
        created() {
            console.log('Component is created')
        },
        mounted() {
            console.log('Component is mounted');
            this.axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => (this.info = response.data.bpi))
                .catch(error => console.log(error));
        },
        data () {
            return {
                search: '',
                bpi: []
            }
        },

        filters: {
            currencydecimal (value) {
                return value.toFixed(2)
            }
        },

        methods: {
            ProgramForHealthy :function() {
                console.log('test');
                this.axios
                    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    .then(response => (this.info = response.data.bpi))
                    .catch(error => console.log(error));


                /*this.axios.post('http://47.100.227.73:8080/publish',
                    {
                        json :
                            {
                                userName: this.store.state.username,
                                userPwd: this.store.state.password,
                                ProgramName : this.programName,
                                State:this.ClinicalState,
                                DrugName:this.drugName,
                                DiseaseType:this.diseaseType,
                                AdaptationDisease:this.ApplicationDisease,
                            }
                    }).then((response) => {
                    console.log(response);

                    //  @return 0发布失败 1发布成功
                    switch (parseInt(response)) {
                        case 0 : alert('发布失败 TAT');
                            break;
                        case 1 : alert('发布成功！');
                            break;
                        default : alert('哎呀！不知道哪里出错了 QAQ');
                    }
                });
*/


            }
        }
    }
</script>


<style scoped>
    square {
        background-color: blue;
        color: #fff;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .small {
        width: 100px;
        height: 100px;
    }
    .medium {
        width: 200px;
        height: 200px;
    }
    .large {
        width: 300px;
        height: 300px;
    }

    .healthy-background {
        background: url('../assets/healthy-background.jpg');
        background-size: cover;
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
