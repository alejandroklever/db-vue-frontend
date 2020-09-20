<template>
<div>
    <v-row
        justify="center"
        >
        <v-pagination
            v-if="count > 1"
            v-model="page"
            circle
            :length="count"
            :total-visible="10"
            @input="action()"
            @previous="action()"
            @next="action()"
            >
        </v-pagination>
    </v-row>
    <v-row>
        <v-col v-for="item in articleList" :key="item.name" cols="12" md="3">
            <v-card
                class="mx-auto"
                style=" padding-left: 2rem; padding-right: 2rem;"
                max-width="344"
                :shaped=true
                elevation="6"
                >
                <v-card-text>
                    <p class="display-1 text--primary">
                        {{ item.title }}
                    </p>
                    <div><strong>Palabras Claves</strong></div>
                    <p class="text--primary">
                        {{ item.keywords }}
                    </p>

                    <div><strong>Evaluación</strong></div>
                    <p class="text--primary">
                        {{ item.evaluation }}
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="blue accent-4" @click="action">
                        Ver
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'
import RequestManager from '@/scripts/RequestManager'

import  Article  from '@/components/Article.vue'

@Component({components: { Article },})
export default class Article1 extends Vue {
    circle = true
    page = 1
    count = 0
    value = 0
    articleList: any[] = []

    action(){
        this.articleList = []
        let onResponse = (r: AxiosResponse<any>) => {
            for (const item of r.data.results) {
                this.articleList.push(item.article)
            } 
        }
        RequestManager.nextPageAvailable(this.page, onResponse)
        onResponse = (r: AxiosResponse<any>) => {
            let count1 = r.data.count / 10
            count1 = Number.isInteger(count1) ? count1 : count1 + 1
            this.count = Number.isInteger(count1) ? count1 : Number.parseInt(count1.toFixed(0))
        }
        RequestManager.getArticleList(this.page, onResponse)
    }

    action1 = this.action()
}
</script>