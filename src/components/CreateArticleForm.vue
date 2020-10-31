<template>
    <v-card width="600">
        <v-row justify="center">
            <v-card-title class="text-center font-weight-bold">Crear Artículo</v-card-title>
        </v-row>
        <v-form @submit.prevent="createArticle">
            <v-col>
                <v-text-field label="Título" prepend-icon="mdi-file-document-edit-outline"></v-text-field>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AppBarAndNavigationDrawer from '@/components/AppBarAndNavigationDrawer.vue'
@Component({
    components: {
        'app-bar-and-navigation-drawer': AppBarAndNavigationDrawer,
    },
})
export default class CreateArticleView extends Vue {
    private mainEmailAuthor = ''
    private authorsEmailSelected = []
    private authorsEmailOptions = []
    private keywordsSelected = []
    private keywordsOptions = []

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
