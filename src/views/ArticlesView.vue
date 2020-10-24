<template>
    <v-col>
        <v-card class="mx-auto" elevation="0">
            <v-spacer></v-spacer>
            <v-data-iterator
                :items="articles"
                item-key="title"
                :page="page"
                :items-per-page.sync="itemsPerPage"
                :single-expand="true"
                hide-default-footer
            >
                <template v-slot:header>
                    <v-toolbar  dark color="primary" class="mb-1">
                        <v-text-field
                            v-model="search"
                            clearable
                            flat
                            solo-inverted
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            label="Search"
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
                                label="Sort by"
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
                            <v-btn fab small color="blue" @click="createArticle">
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
                                <v-card-title>
                                    <h4>{{ article.title }}</h4>
                                </v-card-title>

                                <v-row>
                                    <v-switch
                                        :input-value="isExpanded(article)"
                                        class="pl-4 mt-0"
                                        append-icon="mdi-pencil"
                                        @change="
                                            v => {
                                                expand(article, v)
                                                currentArticle = article
                                            }
                                        "
                                    ></v-switch>
                                    <v-spacer></v-spacer>
                                    <v-card-actions class="pr-4 mt-1">
                                        <v-btn dark>Eliminar</v-btn>
                                    </v-card-actions>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row v-if="isExpanded(article)" justify="center">
                                    <v-col offset="1" cols="5">
                                        <v-combobox
                                            v-model="article.authors"
                                            :filter="filter"
                                            :hide-no-data="!search"
                                            :items="article.authors"
                                            :search-input.sync="userEmailSearch"
                                            hide-selected
                                            label="Autores"
                                            multiple
                                            small-chips
                                        >
                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <span class="subheading">Create</span>
                                                    <v-chip color="primary lighten-3" label small>
                                                        {{ search }}
                                                    </v-chip>
                                                </v-list-item>
                                            </template>
                                            <template v-slot:selection="{ attrs, item, parent, selected }">
                                                <v-chip
                                                    v-if="item === Object(item)"
                                                    v-bind="attrs"
                                                    :color="`${item.color} lighten-3`"
                                                    :input-value="selected"
                                                    label
                                                    small
                                                >
                                                    <span class="pr-2">
                                                        {{ item.text }}
                                                    </span>
                                                    <v-icon small @click="parent.selectItem(item)">
                                                        close
                                                    </v-icon>
                                                </v-chip>
                                            </template>
                                            <!--Editing-->
                                            <template v-slot:item="{ index, item }">
                                                <v-text-field
                                                    v-if="editing === item"
                                                    v-model="editing.text"
                                                    autofocus
                                                    flat
                                                    background-color="transparent"
                                                    hide-details
                                                    solo
                                                    @keyup.enter="edit(index, item)"
                                                ></v-text-field>
                                                <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
                                                    {{ item.text }}
                                                </v-chip>
                                                <v-spacer></v-spacer>
                                                <v-list-item-action @click.stop>
                                                    <v-btn icon @click.stop.prevent="edit(index, item)">
                                                        <v-icon>{{
                                                            editing !== item ? 'mdi-pencil' : 'mdi-check'
                                                        }}</v-icon>
                                                    </v-btn>
                                                </v-list-item-action>
                                            </template>
                                        </v-combobox>
                                    </v-col>
                                    <v-col cols="5">
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    v-model="article.title"
                                                    placeholder="Título"
                                                    :label="article.title"
                                                    prepend-icon="mdi-file-document-outline"
                                                ></v-text-field>
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
                                        </v-row>
                                    </v-col>
                                    <v-col cols="1"></v-col>
                                    <v-col offset="9" cols="2">
                                        <v-btn color="default">Editar</v-btn>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ArticleCard from '@/components/ArticleCard.vue'

@Component({
    components: { ArticleCard },
})
export default class ArticlesView extends Vue {
    private page = 1
    private search = ''
    private keys = ['title', 'authors']
    private sortBy = ''
    private sortDesc = false
    private itemsPerPage = 10
    private files = []
    private editing = null
    private editingIndex = -1

    private userEmailSearch = ''
    private currentArticle = null

    @Prop() createArticle!: () => void

    private articles = [
        {
            title: 'Grafos y Planicidad',
            keywords: ['Planicidad', 'Grafos'],
            authors: [
                { text: 'Alejandro Klever', color: 'blue' },
                { text: 'Yasmin Cisneros Cimadevila', color: 'red' },
                { text: 'Miguel Angel Gonzalez', color: 'green' },
            ],
            model: [
                { text: 'Alejandro Klever', color: 'blue' },
                { text: 'Yasmin Cisneros Cimadevila', color: 'red' },
                { text: 'Miguel Angel Gonzalez', color: 'green' },
            ],
        },
        {
            title: 'Computadoras y sus límites',
            keywords: ['Turing Machine', 'Matematicas'],
            authors: [
                { text: 'Alejandro Klever', color: 'blue' },
                { text: 'Yasmin Cisneros Cimadevila', color: 'red' },
                { text: 'Miguel Angel Gonzalez', color: 'green' },
            ],
            model: [
                { text: 'Alejandro Klever', color: 'blue' },
                { text: 'Yasmin Cisneros Cimadevila', color: 'red' },
                { text: 'Miguel Angel Gonzalez', color: 'green' },
            ],
        },
        {
            title: 'Transforamda de Fourier y deteccioin de bordes en imagenes',
            keywords: ['Fourier', 'Imagenes', 'Bordes'],
            authors: [
                { text: 'Alejandro Klever', color: 'blue' },
                { text: 'Yasmin Cisneros Cimadevila', color: 'red' },
                { text: 'Miguel Angel Gonzalez', color: 'green' },
            ],
            model: [
                { text: 'Alejandro Klever', color: 'blue' },
                { text: 'Yasmin Cisneros Cimadevila', color: 'red' },
                { text: 'Miguel Angel Gonzalez', color: 'green' },
            ],
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
}
</script>

<style scoped></style>
