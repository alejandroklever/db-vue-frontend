<template>
    <div>  
        <v-btn 
            v-if="previewAvailable" 
            class="ma-2" 
            color="blue accent-4" 
            dark
            @click="previewPage(method)"
            >
            <v-icon dark left>mdi-arrow-left</v-icon>Anterior
        </v-btn>
        <v-btn v-else class="ma-2" color="blue accent-4" dark outlined>
            <v-icon dark left>mdi-arrow-left</v-icon>Anterior
        </v-btn>
        <v-btn 
            v-if="nextAvailable" 
            class="ma-2" 
            color="blue accent-4" 
            dark 
            @click="nextPage(method)"
            >
            <v-icon dark left>mdi-arrow-right</v-icon>Siguiente
        </v-btn>
        <v-btn v-else class="ma-2" color="blue accent-4" dark outlined>
            <v-icon dark left>mdi-arrow-right</v-icon>Siguiente
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Paginator extends Vue {
    @Prop() previewAvailable!: string
    @Prop() nextAvailable!: string
    @Prop() method!: string
    @Prop() previewPage!: string
    @Prop() nextPage!: string
}
</script>