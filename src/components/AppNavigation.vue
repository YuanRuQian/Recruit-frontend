<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="teal lighten-2" dark disable-resize-watcher>
            <v-list>
               <v-list-item-group v-model="item" color="teal">


        <v-list-item v-on:click="BackToHome">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>主页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item v-on:click="ToMenu">
          <v-list-item-icon>
            <v-icon>mdi-file</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>开发文档</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

     <div v-if="this.$store.state.currentUser===null">
        <v-list-item v-on:click="ToSignIn">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登陆</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item v-on:click="ToJoin">
          <v-list-item-icon>
            <v-icon>mdi-face</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>注册</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
     </div>

        <div v-else>
         <v-list-item v-on:click="ToPersonalProfile">
          <v-list-item-icon>
            <v-icon>mdi-airplay</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>个人中心</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item v-on:click="SignMeOut">
          <v-list-item-icon>
            <v-icon>mdi-update</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>

      </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app color="teal" dark>
           <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
            </router-link>
            <v-btn color="white" class="hidden-sm-and-down" text icon @click="BackToHome"><v-icon>mdi-home</v-icon></v-btn>
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
</template>




<script>
    export default {
        name: 'AppNavigation',
        data() {
            return {
                appTitle: '受试者招募系统',
                drawer: false,
            };
        },
        methods:{
            BackToHome :function(){
                this.$router.push({name:'home'});
                this.drawer=false;
            },
            ToMenu:function(){
                this.$router.push({name:'menu'});
                this.drawer=false;
            },
            ToSignIn:function(){
                this.$router.push({name:'sign-in'});
                this.drawer=false;
            },
            ToJoin:function(){
                this.$router.push({name:'join'});
                this.drawer=false;
            },
            ToPersonalProfile: function () {
                switch (this.$store.state.currentType)
                {
                    case 0:
                    case 1: this.$router.push({name:'volunteer-table'});break;
                    case 2: this.$router.push({name:'authority-table'});break;
                }
                this.drawer=false;
            },
            SignMeOut : function () {
                this.$store.state.currentUser=null;
                this.$store.state.currentType=null;
                this.$router.push({name:'home'});
                this.drawer=false;
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
