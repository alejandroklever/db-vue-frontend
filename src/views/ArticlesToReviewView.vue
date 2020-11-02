<template>
    <div>
        <app-bar-and-navigation-drawer></app-bar-and-navigation-drawer>
        <v-main>
            <v-col>
                <v-card class="mx-auto" elevation="0">
                    <v-data-iterator
                        :items="filteredArticles"
                        item-key="id"
                        :page="page"
                        :items-per-page.sync="itemsPerPage"
                        :single-expand="true"
                        :sort-desc="sortDesc"
                        hide-default-footer
                    >
                        <template v-slot:header>
                            <v-toolbar dark color="primary" class="mb-1">
                                <v-text-field
                                    v-model="search"
                                    clearable
                                    flat
                                    solo-inverted
                                    hide-details
                                    prepend-inner-icon="mdi-magnify"
                                    label="Buscar"
                                    @input="onInputSearch"
                                ></v-text-field>
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-spacer></v-spacer>
                                    <v-select
                                        class="mr-4"
                                        v-model="sortBy"
                                        flat
                                        solo-inverted
                                        hide-details
                                        :items="keys"
                                        prepend-inner-icon="mdi-magnify"
                                        label="Ordenar por"
                                        @change="onChangeOrderKey"
                                    ></v-select>
                                    <v-btn-toggle class="mr-4" v-model="sortDesc" mandatory>
                                        <v-btn large depressed color="blue" :value="false">
                                            <v-icon>mdi-arrow-up</v-icon>
                                        </v-btn>
                                        <v-btn large depressed color="blue" :value="true">
                                            <v-icon>mdi-arrow-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>
                                    <v-btn fab color="primary" :to="{ name: 'create-article' }">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                            <v-row class="mt-2" align="center" justify="center">
                                <div class="text-center">
                                    <v-pagination
                                        v-model="page"
                                        :length="Math.ceil(filteredArticles.length / itemsPerPage)"
                                    ></v-pagination>
                                </div>
                            </v-row>
                        </template>
                        <template v-slot:default="{ items, isExpanded, expand }">
                            <v-row>
                                <v-col v-for="article in items" :key="article.id" offset="2" cols="8">
                                    <v-card v-if="article.title.toLowerCase().includes(search)">
                                        <v-row>
                                            <v-card-title>
                                                <h4>{{ article.title }}</h4>
                                            </v-card-title>
                                            <v-spacer></v-spacer>
                                            <span :class="article.color + '--text pr-4 mt-1'">
                                                {{ article.evaluation }}
                                                <v-icon :color="article.color">{{ article.icon }}</v-icon>
                                            </span>
                                        </v-row>
                                        <!--Switches-->
                                        <v-row>
                                            <v-switch
                                                v-if="article.evaluation !== 'aceptado'"
                                                :input-value="showEdit && isExpanded(article)"
                                                class="pl-4 mt-0"
                                                append-icon="mdi-pencil"
                                                @change="v => onChangeEditSwitch(v, article, expand, isExpanded)"
                                            ></v-switch>
                                            <v-switch
                                                :input-value="showAuthors && isExpanded(article)"
                                                class="pl-4 mt-0"
                                                append-icon="mdi-account"
                                                @change="v => onChangeAuthorsSwitch(v, article, expand, isExpanded)"
                                            ></v-switch>
                                            <v-spacer></v-spacer>
                                            <v-card-actions class="pr-4 mt-1">
                                                <v-btn dark>Eliminar</v-btn>
                                            </v-card-actions>
                                        </v-row>
                                        <v-divider></v-divider>

                                        <v-row v-if="showAuthors && isExpanded(article)" justify="center">
                                            <v-row class="pl-8 pr-8 mt-1">
                                                <v-col cols="4" v-for="user in article.authors" v-bind:key="user.id">
                                                    <v-card>
                                                        <v-card-title>
                                                            <b>
                                                                {{ user.username }}
                                                            </b>
                                                        </v-card-title>
                                                        <v-card-subtitle>
                                                            {{ user.email }}
                                                        </v-card-subtitle>
                                                        <v-card-text>{{ user.author.institution }}</v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <v-row
                                            v-if="showEdit && isExpanded(article) && article.evaluation !== 'aceptado'"
                                            justify="center"
                                        >
                                            <v-col cols="5">
                                                <v-file-input
                                                    v-model="files"
                                                    placeholder="Seleccionar fichero"
                                                    label="Fichero"
                                                    multiple
                                                    prepend-icon="mdi-paperclip"
                                                >
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip small label color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-btn color="primary">Actualizar</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </template>
                        <template v-slot:footer>
                            <v-row class="mt-2" align="center" justify="center">
                                <div class="text-center">
                                    <v-pagination
                                        v-model="page"
                                        :length="Math.ceil(filteredArticles.length / itemsPerPage)"
                                    ></v-pagination>
                                </div>
                            </v-row>
                        </template>
                    </v-data-iterator>
                </v-card>
            </v-col>
        </v-main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppBarAndNavigationDrawer from '@/components/AppBarAndNavigationDrawer.vue'
import Calendar from '@/components/Calendar.vue'
import { Article } from '@/scripts/models'
import RequestManager from '@/scripts/request-manager'
import DataManager from '@/scripts/data-manager'
@Component({
    components: { Calendar, AppBarAndNavigationDrawer },
})
export default class ArticlesToReviewView extends Vue {
    private refereeId = 0

    private page = 1
    private search = ''
    private sortBy = ''
    private keys = ['Título', 'Evaluación', 'Fecha de envío', 'Fecha de finalización']
    private sortDesc = false
    private itemsPerPage = 5
    private files = []

    private showEdit = false
    private showAuthors = false

    private currentArticle = null
    private articles: Article[] = []
    private filteredArticles: Article[] = []

    created(): void {
        this.refereeId = parseInt(this.$route.params.refereeId)
        RequestManager.getReviewArticles(
            this.refereeId,
            r => {
                const articles = r.data.results
                for (let i = 0; i < articles.length; i++) {
                    this.articles.push(new Article(articles[i]))
                    this.filteredArticles.push(new Article(articles[i]))
                }
            },
            r => console.log(r)
        )
    }

    onChangeEditSwitch(v: any, article: any, expand: any, isExpanded: any) {
        if (this.showAuthors) this.showAuthors = false
        expand(article, v)
        this.showEdit = isExpanded(article)
        this.currentArticle = article
    }

    onChangeAuthorsSwitch(v: any, article: any, expand: any, isExpanded: any) {
        if (this.showEdit) this.showEdit = false
        expand(article, v)
        this.showAuthors = isExpanded(article)
        this.currentArticle = article
    }

    onInputSearch(any: any): void {
        if (this.search != '' && any != null)
            this.filteredArticles = this.articles.filter(x => x.title.toLowerCase().includes(this.search.toLowerCase()))
        else this.filteredArticles = this.articles
    }

    onChangeOrderKey(any: any): void {
        let compareFn = undefined
        if (this.sortBy === 'Título') compareFn = Article.titleCompare
        else if (this.sortBy === 'Evaluación') compareFn = Article.evaluationCompare
        else if (this.sortBy === 'Fecha de envío') compareFn = Article.submitDateCompare
        else if (this.sortBy === 'Fecha de finalización') compareFn = Article.endDateCompare

        let articles = this.articles

        if (this.search != '')
            articles = articles.filter(x => x.title.toLowerCase().includes(this.search.toLowerCase()))

        if (compareFn)
            if (this.sortDesc) this.filteredArticles = articles.sort(compareFn).reverse()
            else this.filteredArticles = articles.sort(compareFn)
        else this.filteredArticles = articles
    }

    get user() {
        return DataManager.user
    }
}
</script>

<style scoped></style>
