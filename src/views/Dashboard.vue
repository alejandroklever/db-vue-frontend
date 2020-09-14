<template>
    <div>
        <v-app-bar app absolute color="blue darken-2" dark scroll-target="#scrolling-techniques-6">
            <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">Revista Cientifica</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
        </v-app-bar>
        <v-navigation-drawer app floating color="blue darken-2" :mini-variant="miniVariant" :permanent="false" dark>
            <v-list dense nav class="py-0">
                <v-list-item two-line class="px-0">
                    <v-list-item-avatar>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ user.username }}</v-list-item-title>
                        <v-list-item-subtitle>{{ user.author.institution }}</v-list-item-subtitle>
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
            <user-configuration v-if="editProfile"></user-configuration>
        </v-main>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import DataManager from '../scripts/data-manager'
import GenericMainVue from '@/views/GenericMainVue.vue'
import UserConfigurationView from '@/views/UserConfigurationView.vue'
import RequestManager from '@/scripts/request-manager'

@Component({
    components: { 'user-configuration': UserConfigurationView },
})
export default class Dashboard extends Vue {
    private permanent = true
    private miniVariant = false
    private showDashboard = false
    private showArticleList = false
    private showRevList = false
    private showPhotos = false
    private showAbout = false
    private editProfile = false

    private items = [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', action: () => 0 },
        { title: 'Artículos', icon: 'mdi-file-document-outline', action: () => 1 },
        { title: 'Revision', icon: 'mdi-file-document-edit-outline', action: () => 2 },
        { title: 'Photos', icon: 'mdi-image', action: () => 3 },
        { title: 'About', icon: 'mdi-help-box', action: () => 4 },
    ]

    created() {
        if (!DataManager.token) this.$router.push('Login')
        else if (!DataManager.user)
            RequestManager.getUserFromToken(DataManager.token, r => {
                DataManager.setUser(r.data.user)
                console.log('logged user => ', DataManager.user?.username)
                this.editProfile = true
            })
        else this.editProfile = true
    }

    get user() {
        return DataManager.user
    }
}
</script>
