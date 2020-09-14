<template>
    <v-card
        class="mx-auto"
        style=" padding-left: 2rem; padding-right: 2rem;"
        max-width="344"
        shaped="true"
        elevation="6"
        >
        <v-card-text>
            <p class="display-1 text--primary">
                {{ title }}
            </p>
            <div><strong>Palabras Claves</strong></div>
            <p class="text--primary">
                {{ keywords }}
            </p>

            <div><strong>Evaluación</strong></div>
            <p class="text--primary">
                {{ evaluation }}
            </p>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="blue accent-4" @click="action">
                Ver
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Article extends Vue {
    @Prop() title!: string
    @Prop() keywords!: string
    @Prop() evaluation!: string
    @Prop() action!: string
}
</script>