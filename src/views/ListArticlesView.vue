<template>
    <div>
        <app-bar-and-navigation-drawer></app-bar-and-navigation-drawer>
        <v-main>
            <v-col>
                <v-card class="mx-auto" elevation="0">
                    <v-data-iterator
                        :items="articles"
                        item-key="title"
                        :page="page"
                        :items-per-page.sync="itemsPerPage"
                        :single-expand="true"
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
                                ></v-text-field>
                                <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-spacer></v-spacer>
                                    <v-select
                                        v-model="sortBy"
                                        flat
                                        solo-inverted
                                        hide-details
                                        :items="keys"
                                        prepend-inner-icon="mdi-magnify"
                                        label="Ordenar por"
                                    ></v-select>
                                    <v-spacer></v-spacer>
                                    <v-btn-toggle v-model="sortDesc" mandatory>
                                        <v-btn large depressed color="blue" :value="false">
                                            <v-icon>mdi-arrow-up</v-icon>
                                        </v-btn>
                                        <v-btn large depressed color="blue" :value="true">
                                            <v-icon>mdi-arrow-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>
                                    <v-spacer></v-spacer>
                                    <v-btn fab color="primary" :to="{ name: 'create-article' }">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-toolbar>
                            <v-row class="mt-2" align="center" justify="center">
                                <div class="text-center">
                                    <v-pagination
                                        v-model="page"
                                        :length="Math.ceil(articles.length / itemsPerPage)"
                                    ></v-pagination>
                                </div>
                            </v-row>
                        </template>
                        <template v-slot:default="{ items, isExpanded, expand }">
                            <v-row>
                                <v-col v-for="article in items" :key="article.title" offset="2" cols="8">
                                    <v-card>
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
                                                        <v-card-text>{{ user.institution }}</v-card-text>
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
                                        :length="Math.ceil(articles.length / itemsPerPage)"
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import ArticleCard from '@/components/ArticleCard.vue'
import AppBarAndNavigationDrawer from '@/components/AppBarAndNavigationDrawer.vue'
import CreateArticleForm from '@/components/CreateArticleForm.vue'
import DataManager from '@/scripts/data-manager'

@Component({
    components: {
        ArticleCard,
        AppBarAndNavigationDrawer,
        CreateArticleForm,
    },
})
export default class ListArticlesView extends Vue {
    private page = 1
    private search = ''
    private keys = ['título', 'autor']
    private sortBy = ''
    private sortDesc = false
    private itemsPerPage = 10
    private files = []
    private editing = null
    private editingIndex = -1
    private currentArticle = null

    private showEdit = false
    private showAuthors = false

    @Prop() createArticle!: () => void

    private articles = [
        {
            title: 'Grafos y Planicidad',
            keywords: ['Planicidad', 'Grafos'],
            authors: [
                {
                    id: 1,
                    username: 'Alejandro Klever',
                    email: 'alejandroklever4197@gmail.com',
                    institution: 'Universidad de la Habana',
                },
                {
                    id: 2,
                    username: 'Yasmin Cisneros Cimadevila',
                    email: 'yasmincisneros@gmail.com',
                    institution: 'Universidad de la Habana',
                },
                {
                    id: 3,
                    username: 'Miguel Angel Gonzalez',
                    email: 'miguelgonzalez@gmail.com',
                    institution: 'Universidad de la Habana',
                },
            ],
            color: 'green',
            evaluation: 'aceptado',
            icon: 'mdi-check-outline',
        },
        {
            title: 'Computadoras y sus límites',
            keywords: ['Turing Machine', 'Matematicas'],
            authors: [
                {
                    id: 1,
                    username: 'Alejandro Klever',
                    email: 'alejandroklever4197@gmail.com',
                    institution: 'Universidad de la Habana',
                },
                {
                    id: 2,
                    username: 'Yasmin Cisneros Cimadevila',
                    email: 'yasmincisneros@gmail.com',
                    institution: 'Universidad de la Habana',
                },
                {
                    id: 3,
                    username: 'Miguel Angel Gonzalez',
                    email: 'miguelgonzalez@gmail.com',
                    institution: 'Universidad de la Habana',
                },
            ],
            color: 'primary',
            evaluation: 'aceptado con cambios míinimos',
            icon: 'mdi-check-outline',
        },
        {
            title: 'Transformada de Fourier y detección de bordes en imágenes',
            keywords: ['Fourier', 'Imagenes', 'Bordes'],
            authors: [
                {
                    id: 1,
                    username: 'Alejandro Klever',
                    email: 'alejandroklever4197@gmail.com',
                    institution: 'Universidad de la Habana',
                },
                {
                    id: 2,
                    username: 'Yasmin Cisneros Cimadevila',
                    email: 'yasmincisneros@gmail.com',
                    institution: 'Universidad de la Habana',
                },
                {
                    id: 3,
                    username: 'Miguel Angel Gonzalez',
                    email: 'miguelgonzalez@gmail.com',
                    institution: 'Universidad de la Habana',
                },
            ],
            color: 'red',
            evaluation: 'denegado',
            icon: 'mdi-close-box-outline',
        },
    ]

    edit(index: any, item: any) {
        if (!this.editing) {
            this.editing = item
            this.editingIndex = index
        } else {
            this.editing = null
            this.editingIndex = -1
        }
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

    get user() {
        return DataManager.user
    }
}
</script>

<style scoped></style>
