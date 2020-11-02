<template>
    <v-form @submit.prevent="editUser">
        <v-row justify="center">
            <v-col cols="6">
                <v-text-field label="Nombre de Usuario" v-model="data.username" rounded outlined></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field label="Email" v-model="data.email" rounded outlined></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field label="Nombre" v-model="data.firstName" rounded outlined></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field label="Apellido(s)" v-model="data.lastName" rounded outlined></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="data.author == null ? 12 : 6">
                <v-text-field label="Institución" v-model="data.author.institution" rounded outlined></v-text-field>
            </v-col>
            <v-col cols="6" v-if="data.referee != null">
                <v-text-field label="Speciality" v-model="data.referee.specialities" rounded outlined></v-text-field>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-btn color="primary" type="submit">Editar</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { objectToSnakeCase } from '@/scripts/tools/name-formating'
import RequestManager from '@/scripts/request-manager'
import DataManager from '@/scripts/data-manager'

@Component
export default class UserInfoForm extends Vue {
    private data: any = {}

    get user() {
        return DataManager.user
    }

    created() {
        this.data = {
            username: this.user?.username,
            firstName: this.user?.firstName,
            lastName: this.user?.lastName,
            email: this.user?.email,
            author: this.user?.author != null ? { institution: this.user?.author?.institution } : null,
            referee: this.user?.referee != null ? { speciality: this.user?.referee?.specialities } : null,
        }
    }

    editUser(): void {
        RequestManager.putUser(
            DataManager.user?.id ?? 0,
            objectToSnakeCase(this.data),
            r => {
                console.log("successful update")
                DataManager.setUser(r.data)
                this.created()
            },
            () => {
                //
            }
        )
    }
}
</script>

<style scoped></style>
