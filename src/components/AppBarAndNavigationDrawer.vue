<template>
    <div>
        <v-navigation-drawer app floating color="blue darken-2" :mini-variant="miniVariant" :permanent="false" dark>
            <v-list dense nav class="py-0">
                <v-list-item two-line class="px-0">
                    <v-list-item-avatar>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content v-if="true">
                        <v-list-item-title>{{ user.username }}</v-list-item-title>
                        <v-list-item-subtitle>{{ user.institution }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="item in items" v-bind:key="item.title" @click="item.action">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app absolute color="blue darken-2" dark scroll-target="#scrolling-techniques-6">
            <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">Revista Cientifica</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark><v-icon>mdi-bell</v-icon></v-btn>
            <v-menu offset-x offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title> Editar </v-list-item-title>
                        <v-list-item-action></v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title> Salir </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DataManager from '@/scripts/data-manager'
import RequestManager from '@/scripts/request-manager'

@Component
export default class AppBarAndNavigationDrawer extends Vue {
    @Prop() onLoadUser!: () => void

    private miniVariant = false
    private user = {
        username: '',
        institution: '',
    }

    private items = [
        {
            title: 'Artículos',
            icon: 'mdi-file-document-outline',
            action: () => {
                //
            },
        },
        {
            title: 'Revision',
            icon: 'mdi-file-document-edit-outline',
            action: () => {
                //
            },
        },

        {
            title: 'Estadísticas',
            icon: 'mdi-trending-up',
            action: () => {
                //
            },
        },
        {
            title: 'Ayuda',
            icon: 'mdi-help-box',
            action: () => {
                //
            },
        },
    ]

    created() {
        if (!DataManager.token) this.$router.push('login')
        else if (!DataManager.user)
            RequestManager.getUserFromToken(
                DataManager.token,
                r => {
                    DataManager.setUser(r.data.user)
                    console.log('logged user =>', DataManager.user?.username)
                    this.user.username = DataManager.user?.username || ''
                    this.user.institution = DataManager.user?.author?.institution || ''
                    this.onLoadUser?.()
                },
                r => {
                    console.log(r)
                    localStorage.removeItem('token')
                    this.$router.push('login')
                }
            )
        else {
            this.user.username = DataManager.user.username || ''
            this.user.institution = DataManager.user.author?.institution || ''
            console.log(this.user)
        }
    }
}
</script>

<style scoped></style>
