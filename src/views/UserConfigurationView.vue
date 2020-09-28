<template>
    <v-col>
        <v-card class="mx-auto" elevation="0">
            <v-row justify="center">
                <v-card-title>
                    <h2>Información del Usuario</h2>
                    <v-icon color="black" size="35">mdi-account</v-icon>
                </v-card-title>
            </v-row>
            <v-row justify="center">
                <v-col cols="3">
                    <v-card elevation="100">
                        <v-card-title> Ficha </v-card-title>
                        <v-card-text v-for="property in properties" v-bind:key="property.key">
                            <strong v-if="property.value != null">
                                <b>{{ property.key }}:</b></strong
                            >
                            {{ property.value }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="5">
                    <v-tabs v-model="tab" background-color="primary" dark centered icons-and-text>
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab href="#tab-1">
                            Información
                            <v-icon>mdi-account</v-icon>
                        </v-tab>

                        <v-tab href="#tab-2">
                            Contraseña
                            <v-icon>mdi-lock</v-icon>
                        </v-tab>
                        <v-tabs-items v-model="tab">
                            <v-tab-item value="tab-1">
                                <user-info-form :on-successful-response="created"></user-info-form>
                            </v-tab-item>
                            <v-tab-item value="tab-2">
                                <change-password-form></change-password-form>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DataManager from '@/scripts/data-manager'

import UserInfoForm from '@/components/UserInfoForm.vue'
import ChangePasswordForm from '@/components/ChangePasswordForm.vue'

@Component({
    components: {
        'user-info-form': UserInfoForm,
        'change-password-form': ChangePasswordForm,
    },
})
export default class UserConfigurationView extends Vue {
    private tab = null
    private properties: { key: string; value: string | number | undefined }[] = []

    created() {
        this.updateProperties()
    }

    updateProperties(): void {
        this.properties = [
            { key: 'Nombre de Usuario', value: this.user?.username },
            { key: 'Nombre', value: this.user?.firstName },
            { key: 'Apellido(s)', value: this.user?.lastName },
            { key: 'Email', value: this.user?.email },
            { key: 'Institución', value: this.user?.author?.institution },
            { key: 'ORCID', value: this.user?.author?.orcid },
            { key: 'Especialidad', value: this.user?.referee?.speciality },
        ]
    }

    get user() {
        return DataManager.user
    }
}
</script>

<style scoped></style>
