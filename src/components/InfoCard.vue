<template>
    <v-card elevation="100">
        <v-card-title> Ficha </v-card-title>
        <v-card-text v-model="user.username" v-text="user.username"></v-card-text>
        <v-card-text v-model="user.firstName" v-text="user.firstName"></v-card-text>
        <v-card-text v-model="user.lastName" v-text="user.lastName"></v-card-text>
        <v-card-text v-model="user.email" v-text="user.email"></v-card-text>
        <v-card-text v-model="user.author.institution" v-text="user.author.institution"></v-card-text>
        <v-card-text
            v-model="user.referee.speciality"
            v-text="user.referee.speciality"
            v-if="user.referee != null"
        ></v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataManager from '../scripts/data-manager'

@Component
export default class InfoCard extends Vue {
    get user() {
        return DataManager.user
    }
}
</script>

<style scoped></style>
