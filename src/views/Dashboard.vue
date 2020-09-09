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

                <v-list-item v-for="item in items" v-bind:key="item.title" @click="action(item.action)">
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
            <v-container class="fill-height" style="padding-top: 20px; height: 100%" fluid>
                <div v-if="showArticleList">
                    <!-- BOTONES DE MOVIMIENTO -->
                    <MoveButtons
                        :previewAvailable="previewPageAvailable"
                        :nextAvailable="nextPageAvailable"
                        :method="getArticleList"
                        :nextPage="next"
                        :previewPage="preview"
                        >
                    </MoveButtons>
                    <!-- LISTAR ARTICULOS -->
                    <v-row>
                        <v-col v-for="item in articleList" :key="item.name" cols="12" md="3">
                            <Card 
                                :title="item.title"
                                :keywords="item.keywords"
                                :evaluation="item.evaluation"
                                > 
                            </Card>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-main>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { AxiosResponse } from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import UserManager from '@/scripts/UserManager'
import RequestManager from '@/scripts/RequestManager'

import  MoveButtons  from '@/components/MoveButtons.vue'
import  Card  from '@/components/Card.vue'

@Component({components: { MoveButtons, Card },})
export default class Dashboard extends Vue {
    private permanent = true
    private miniVariant = false
    showDashboard = false
    showArticleList = false
    showRevList = false
    showPhotos = false
    showAbout = false

    page = 1
    articleList: any[] = []
    nextPageAvailable = false
    previewPageAvailable = false

    private items = [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', action: 1 },
        { title: 'Artículos', icon: 'mdi-file-document-outline', action: 2 },
        { title: 'Revision', icon: 'mdi-file-document-edit-outline', action: 3 },
        { title: 'Photos', icon: 'mdi-image', action: 4 },
        { title: 'About', icon: 'mdi-help-box', action: 5 },
    ]
 
    action(item: number) {
        this.showAbout = this.showArticleList = this.showDashboard = this.showPhotos = this.showRevList = false
        this.page = 1

        if (item == 1) this.showDashboard = true
        else if (item == 2) {
            this.showArticleList = true
            this.getArticleList(this.page)
        } 
        else if (item == 3) this.showRevList = true
        else if (item == 4) this.showPhotos = true
        else this.showAbout = true
    }

    getArticleList(page: number){
        let onResponse = (r: AxiosResponse<any>) => {
            for (const item of r.data.results) {
                this.articleList.push(item.article)
            } 
        }
        RequestManager.getArticleList(page, onResponse);

        onResponse = (r: AxiosResponse<any>) => {
            this.nextPageAvailable =  r.data.count > page * 10
        }
        RequestManager.nextPageAvailable(page, onResponse)
    }

    next(method: any) {
        this.page += 1
        this.previewPageAvailable = this.page != 1
        this.articleList = []
        method(this.page)
    }

    preview(method: any) {
        this.page -= 1
        this.previewPageAvailable = this.page != 1
        this.articleList = []
        method(this.page)
    }
}

</script>

