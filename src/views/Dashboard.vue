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
                        <v-list-item-title>Application</v-list-item-title>
                        <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="item in items" v-bind:key="item.title">
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
            <!--            <v-container class="fill-height" style="padding-top: 20px; height: 100%" fluid>-->
            <!--                <div v-if="showArticleList">-->
            <!--                    <v-btn v-if="notFirstPage" class="ma-2" color="blue accent-4" dark @click="preview(getArticleList)">-->
            <!--                        <v-icon dark left>mdi-arrow-left</v-icon>Anterior-->
            <!--                    </v-btn>-->
            <!--                    <v-btn v-else class="ma-2" color="blue accent-4" dark outlined>-->
            <!--                        <v-icon dark left>mdi-arrow-left</v-icon>Anterior-->
            <!--                    </v-btn>-->
            <!--                    <v-btn-->
            <!--                        v-if="nextPage.length > 0"-->
            <!--                        class="ma-2"-->
            <!--                        color="blue accent-4"-->
            <!--                        dark-->
            <!--                        @click="next(getArticleList)"-->
            <!--                    >-->
            <!--                        <v-icon dark left>mdi-arrow-right</v-icon>Siguiente-->
            <!--                    </v-btn>-->
            <!--                    <v-btn v-else class="ma-2" color="blue accent-4" dark outlined>-->
            <!--                        <v-icon dark left>mdi-arrow-right</v-icon>Siguiente-->
            <!--                    </v-btn>-->
            <!--                    <v-row>-->
            <!--                        <v-col v-for="item in articleList" :key="item.name" cols="12" md="3">-->
            <!--                            <v-card-->
            <!--                                class="mx-auto"-->
            <!--                                style=" padding-left: 2rem; padding-right: 2rem;"-->
            <!--                                max-width="344"-->
            <!--                                shaped="true"-->
            <!--                                elevation="6"-->
            <!--                            >-->
            <!--                                <v-card-text>-->
            <!--                                    <p class="display-1 text&#45;&#45;primary">-->
            <!--                                        {{ item.title }}-->
            <!--                                    </p>-->
            <!--                                    <div><strong>Palabras Claves</strong></div>-->
            <!--                                    <p class="text&#45;&#45;primary">-->
            <!--                                        {{ item.keywords }}-->
            <!--                                    </p>-->

            <!--                                    <div><strong>Evaluación</strong></div>-->
            <!--                                    <p class="text&#45;&#45;primary">-->
            <!--                                        {{ item.evaluation }}-->
            <!--                                    </p>-->
            <!--                                </v-card-text>-->
            <!--                                <v-card-actions>-->
            <!--                                    <v-btn text color="blue accent-4">-->
            <!--                                        Ver-->
            <!--                                    </v-btn>-->
            <!--                                </v-card-actions>-->
            <!--                            </v-card>-->
            <!--                        </v-col>-->
            <!--                    </v-row>-->
            <!--                </div>-->
            <!--            </v-container>-->
        </v-main>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import DataManager from '../scripts/data-manager'
import RequestManager from '@/scripts/request-manager'

@Component
export default class Dashboard extends Vue {
    private permanent = true
    private miniVariant = false
    private showDashboard = false
    private showArticleList = false
    private showRevList = false
    private showPhotos = false
    private showAbout = false

    private items = [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', action: 1 },
        { title: 'Artículos', icon: 'mdi-file-document-outline', action: 2 },
        { title: 'Revision', icon: 'mdi-file-document-edit-outline', action: 3 },
        { title: 'Photos', icon: 'mdi-image', action: 4 },
        { title: 'About', icon: 'mdi-help-box', action: 5 },
    ]

    created() {
        if (!DataManager.token) {
            this.$router.push('Login')
        } else if (!DataManager.user) {
            DataManager.getUserRequest()
        }
    }
}
</script>
