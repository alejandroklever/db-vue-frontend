<template>
    <v-container>
        <app-bar-and-navigation-drawer></app-bar-and-navigation-drawer>
        <v-main>
            <v-card elevation="0">
                <v-row class="mb-16" justify="center">
                    <v-card-title>
                        <h2>Formulario de envío de artículos</h2>
                        <v-icon color="black" size="35">mdi-file-document</v-icon>
                    </v-card-title>
                </v-row>
                <v-row class="mt-16" justify="center">
                    <v-card width="600">
                        <v-row justify="center">
                            <v-card-title class="text-center font-weight-bold">Introduzca los datos</v-card-title>
                        </v-row>
                        <v-form @submit.prevent="createArticle">
                            <v-col>
                                <v-text-field
                                    label="Título"
                                    prepend-icon="mdi-file-document-edit-outline"
                                ></v-text-field>
                                <v-combobox
                                    v-model="authorsEmailSelected"
                                    :items="authorsEmailOptions"
                                    label="Correo de Autores"
                                    prepend-icon="mdi-email-outline"
                                    multiple
                                    small-chips
                                    @change="addEmail"
                                >
                                </v-combobox>
                                <v-combobox
                                    v-model="mainEmailAuthor"
                                    :items="authorsEmailOptions"
                                    label="Autor de correpondencia"
                                    prepend-icon="mdi-account-outline"
                                    small-chips
                                >
                                </v-combobox>
                                <v-combobox
                                    v-model="keywordsSelected"
                                    :items="keywordsOptions"
                                    label="Palabras Claves"
                                    prepend-icon="mdi-key-outline"
                                    multiple
                                    small-chips
                                    @change="addKeyword"
                                >
                                </v-combobox>
                                <v-file-input label="Fichero"></v-file-input>
                            </v-col>
                            <v-row justify="end">
                                <v-card-actions class="pr-5 mt-0">
                                    <v-btn type="submit">Crear</v-btn>
                                    <v-btn :to="{ name: 'list-articles' }">Cancelar</v-btn>
                                </v-card-actions>
                            </v-row>
                        </v-form>
                    </v-card>
                    <v-card width="400">
                        <v-row justify="center">
                            <v-card-title class="text-center font-weight-bold">
                                Colaboradores
                            </v-card-title>
                        </v-row>
                      <v-pagination>

                      </v-pagination>
                            <v-list>
                                <v-list-item v-for="collaborator in collaborators" v-bind:key="collaborator">
                                    <v-list-item-content>
                                        {{ collaborator }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                    </v-card>
                </v-row>
            </v-card>
        </v-main>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AppBarAndNavigationDrawer from '@/components/AppBarAndNavigationDrawer.vue'
@Component({
    components: {
        AppBarAndNavigationDrawer,
    },
})
export default class CreateArticleView extends Vue {
    private mainEmailAuthor = ''
    private authorsEmailSelected = []
    private authorsEmailOptions = []
    private keywordsSelected = []
    private keywordsOptions = []

    private collaborators = [
        'alejandroklever@gmail.com',
    ]

    createArticle(): void {
        //
    }

    addEmail(): void {
        this.addNewToOptions(this.authorsEmailOptions, this.authorsEmailSelected)
    }

    addKeyword(): void {
        this.addNewToOptions(this.keywordsOptions, this.keywordsSelected)
    }

    addNewToOptions(options: any[], selected: any[]): void {
        for (let i = 0; i < selected.length; i++) if (!options.includes(selected[i])) options.push(selected[i])
        options.sort()
    }
}
</script>

<style scoped></style>
