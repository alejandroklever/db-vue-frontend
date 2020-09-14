<template>
    <v-col>
        <v-card class="mx-auto">
            <v-row justify="center">
                <v-card-title>
                    <h2>Información del Usuario</h2>

                    <v-icon color="black" size="35">mdi-account</v-icon>
                </v-card-title>
            </v-row>
            <v-row justify="center">
                <v-col cols="3">
                    <v-card elevation="100">
                        <v-card-text v-for="property in properties" v-bind:key="property.key">
                            <div v-if="property.value != null">
                                <strong>
                                    <b>{{ property.key }}:</b></strong
                                >
                                {{ property.value }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="5">
                    <v-form @submit.prevent="">
                        <v-text-field
                            label="Nombre de Usuario"
                            v-model="userForEdit.username"
                            rounded
                            outlined
                        ></v-text-field>
                        <v-row justify="center">
                            <v-col cols="6">
                                <v-text-field
                                    label="Nombre"
                                    v-model="userForEdit.firstName"
                                    rounded
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Apellido(s)"
                                    v-model="userForEdit.lastName"
                                    rounded
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-checkbox label="Cambiar contraseña" v-model="changePassword"></v-checkbox>
                        <v-slide-x-transition origin="center center">
                            <v-row justify="center" v-show="changePassword">
                                <v-col cols="6">
                                    <v-text-field
                                        label="Nueva Contraseña"
                                        v-model="currentPassword"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPassword ? 'text' : 'password'"
                                        rounded
                                        outlined
                                        @click:append="showPassword = !showPassword"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Nueva Contraseña"
                                        v-model="newPassword"
                                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showNewPassword ? 'text' : 'password'"
                                        rounded
                                        outlined
                                        @click:append="showNewPassword = !showNewPassword"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-slide-x-transition>
                        <v-card-actions>
                          <v-btn color="primary">Edtar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataManager from '@/scripts/data-manager'
import { User } from '@/scripts/models'

@Component
export default class UserConfigurationView extends Vue {
    private showPassword = false
    private showNewPassword = false
    private changePassword = false
    private userForEdit?: User
    private currentPassword = ''
    private newPassword = ''

    private properties = [
        { key: 'Nombre de Usuario', value: this.user?.username },
        { key: 'Nombre', value: this.user?.firstName },
        { key: 'Apellido(s)', value: this.user?.lastName },
        { key: 'Email', value: this.user?.email },
        { key: 'Institución', value: this.user?.author?.institution },
        { key: 'orcid', value: this.user?.author?.orcid },
        { key: 'Institución', value: this.user?.referee?.speciality },
    ]

    created() {
        this.userForEdit = this.user
    }
    get user() {
        return DataManager.user
    }
}
</script>

<style scoped></style>
