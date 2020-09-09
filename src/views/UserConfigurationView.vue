<template>
    <v-col>
        <v-text-field
            label="Nombre de Usuario"
            :placeholder="user.username"
            v-model="user.username"
            rounded
            outlined
        ></v-text-field>
        <v-text-field
            label="Nombre"
            :placeholder="user.firstName"
            v-model="user.firstName"
            rounded
            outlined
        ></v-text-field>
        <v-text-field
            label="Apellido"
            :placeholder="user.lastName"
            v-model="user.lastName"
            rounded
            outlined
        ></v-text-field>
        <v-text-field label="Email" :placeholder="user.email" v-model="user.email" rounded outlined></v-text-field>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataManager from '@/scripts/data-manager'

@Component
export default class UserConfigurationView extends Vue {
    private user = DataManager.user

    created() {
        this.user = DataManager.user
    }
}
</script>

<style scoped></style>
