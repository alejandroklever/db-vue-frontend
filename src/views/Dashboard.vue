<template>
    <div>
        <v-app-bar app absolute color="blue darken-2" dark scroll-target="#scrolling-techniques-6">
            <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">Revista Cientifica</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-x offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        ><v-list-item-title> Editar </v-list-item-title>
                        <v-list-item-action
                            @click.prevent="
                                () => {
                                    setViewsInFalse()
                                    showEditProfileView = true
                                }
                            "
                        >
                        </v-list-item-action
                    ></v-list-item>
                    <v-list-item><v-list-item-title> Salir </v-list-item-title></v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer app floating color="blue darken-2" :mini-variant="miniVariant" :permanent="false" dark>
            <v-list dense nav class="py-0">
                <v-list-item two-line class="px-0">
                    <v-list-item-avatar>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content v-if="user">
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
        <v-main>
            <user-configuration v-if="showEditProfileView"></user-configuration>
            <articles-view v-if="showArticlesView"></articles-view>
        </v-main>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import DataManager from '../scripts/data-manager'
import UserConfigurationView from '@/views/UserConfigurationView.vue'
import RequestManager from '@/scripts/request-manager'
import ArticlesView from '@/views/ArticlesView.vue'

@Component({
    components: { ArticlesView, 'user-configuration': UserConfigurationView, 'articles-view': ArticlesView },
})
export default class Dashboard extends Vue {
    private miniVariant = false

    private showDashboard = false
    private showArticlesView = false
    private showRevList = false
    private showAbout = false
    private showEditProfileView = false

    private user = {
        username: '',
        institution: '',
    }

    private items = [
        {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard',
            action: () => {
                this.setViewsInFalse()
                this.showDashboard = true
            },
        },
        {
            title: 'Artículos',
            icon: 'mdi-file-document-outline',
            action: () => {
                this.setViewsInFalse()
                this.showArticlesView = true
            },
        },
        {
            title: 'Revision',
            icon: 'mdi-file-document-edit-outline',
            action: () => {
                this.setViewsInFalse()
                this.showRevList = true
            },
        },
        {
            title: 'About',
            icon: 'mdi-help-box',
            action: () => {
                this.setViewsInFalse()
                this.showAbout = true
            },
        },
    ]

    created() {
        if (!DataManager.token) this.$router.push('Login')
        else if (!DataManager.user)
            RequestManager.getUserFromToken(DataManager.token, r => {
                DataManager.setUser(r.data.user)
                console.log('logged user =>', DataManager.user?.username)
                this.showArticlesView = true
                this.user.username = DataManager.user?.username || ''
                this.user.institution = DataManager.user?.author?.institution || ''
            })
        else {
            this.showArticlesView = true
            this.user.username = DataManager.user.username || ''
            this.user.institution = DataManager.user.author?.institution || ''
            console.log(this.user)
        }
    }

    setViewsInFalse(): void {
        this.showDashboard = false
        this.showRevList = false
        this.showAbout = false
        this.showArticlesView = false
        this.showEditProfileView = false
    }
}
</script>
