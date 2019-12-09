

<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="teal lighten-2" dark disable-resize-watcher>
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-item :key="index">
                        <v-list-item-content>
                            {{item.title}}
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="teal" dark>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
            </router-link>
            <v-btn color="teal darken-3" class="hidden-sm-and-down" @click="ToMenu">开发文档</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="this.$store.state.currentUser===null">
                <v-btn color="teal darken-3" class="hidden-sm-and-down" @click="ToSignIn">登陆</v-btn>
                <v-btn color="teal darken-3" class="hidden-sm-and-down" @click="ToJoin">注册</v-btn>
            </div>
            <div v-else>
                <v-btn color="teal darken-3" class="hidden-sm-and-down" @click="ToPersonalProfile">个人中心</v-btn>
                <v-btn color="teal darken-3" class="hidden-sm-and-down" @click="SignMeOut">登出</v-btn>
            </div>
        </v-toolbar>
         <v-footer absolute color="teal">
        <v-spacer></v-spacer>
        <div class="white--text">&copy; 信息系统第二小组  {{ new Date().getFullYear() }}</div>
    </v-footer>
    </span>
</template><script>
    export default {
        name: 'AppNavigation',
        data() {
            return {
                appTitle: '受试者招募系统',
                drawer: false,
                items: [
                    { title: '开发文档' },
                    { title: '登陆' },
                    { title: '注册' }
                ]
            };
        },
        methods:{
            ToMenu:function(){
                this.$router.push({name:'menu'});
            },
            ToSignIn:function(){
                this.$router.push({name:'sign-in'});
            },
            ToJoin:function(){
                this.$router.push({name:'join'});
            },
            ToPersonalProfile: function () {
                switch (this.$store.state.currentType)
                {
                    case 0:
                    case 1: this.$router.push({name:'volunteer-table'});break;
                    case 2: this.$router.push({name:'authority-table'});break;
                }
            },
            SignMeOut : function () {
                this.$store.state.currentUser=null;
                this.$store.state.currentType=null;
                this.$router.push({name:'home'});
            }
        }
    };
</script>

<style>
    a {
        color: white;
        text-decoration: none;
        font-weight: bold;
    }
    .v-btn {
        margin: 1rem;
    }
    .v-toolbar__title {
        color:white;
    }

</style>
