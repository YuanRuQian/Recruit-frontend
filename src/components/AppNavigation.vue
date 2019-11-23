<temp

<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="teal lighten-2" dark disable-resize-watcher>
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            {{item.title}}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="teal" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
            </router-link>
            <v-btn color="teal darken-3" class="hidden-sm-and-down" to="/menu">菜单</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn color="teal darken-3" class="hidden-sm-and-down" to="/sign-in">登陆</v-btn>
            <v-btn color="teal darken-3" class="hidden-sm-and-down" to="/join">注册</v-btn>
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
                    { title: '菜单' },
                    { title: '档案' },
                    { title: '登陆' },
                    { title: '注册' }
                ]
            };
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
