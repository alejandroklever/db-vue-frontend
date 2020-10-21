<template>
    <v-container class="blue darken-2" fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="mx-auto" max-width="500">
                    <v-col class="mb-5 offset-2" cols="8">
                        <h1 class="text-center font-weight-bold">Regístrese</h1>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-form @submit.prevent="createUser">
                        <v-col class="offset-1" cols="10">
                            <v-row justify="center">
                                <v-col cols="9">
                                    <v-text-field
                                        label="Nombre de Usuario"
                                        v-model="user.username"
                                        rounded
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Orcid" v-model="user.orcid" rounded outlined> </v-text-field>
                                </v-col>
                            </v-row>

                            <v-text-field label="Email" v-model="user.email" rounded outlined></v-text-field>
                            <v-text-field
                                label="Institución"
                                v-model="user.institution"
                                rounded
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Contraseña"
                                v-model="user.password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                rounded
                                outlined
                                @click:append="showPassword = !showPassword"
                            ></v-text-field>
                            <v-text-field
                                label="Repita la contraseña"
                                v-model="password2"
                                :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword2 ? 'text' : 'password'"
                                rounded
                                outlined
                                @click:append="showPassword2 = !showPassword2"
                            ></v-text-field>
                            <v-fade-transition origin="center center">
                                <v-row justify="center" v-show="error">
                                    <label class="red--text">{{ errorMessage }}</label>
                                </v-row>
                            </v-fade-transition>
                        </v-col>

                        <v-col cols="12">
                            <v-row align="end" justify="center">
                                <v-card-actions>
                                    <v-btn type="submit" width="150" rounded color="primary">
                                        <span>Registrar</span>
                                    </v-btn>
                                    <v-btn width="150" rounded color="secondary" :to="{ name: 'login' }">
                                        <span>Cancelar</span>
                                    </v-btn>
                                </v-card-actions>
                            </v-row>
                        </v-col>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import { emailPattern } from '@/scripts/tools/constants'
import RequestManager from '@/scripts/request-manager'
import DataManager from '@/scripts/data-manager'

@Component
export default class SignUp extends Vue {
    private errorMessage = 'Credenciales inválidas'

    private showPassword = false
    private showPassword2 = false
    private error = false
    private password2 = ''

    private user = {
        username: '',
        email: '',
        orcid: 0,
        institution: '',
        password: '',
    }

    createUser(): void {
        this.error = false
        if (this.user.password != this.password2) {
            this.errorMessage = 'Las contraseñas no son iguales.'
            this.error = true
            return
        }

        if (!emailPattern.test(this.user.email)) {
            this.errorMessage = 'Correo no valido.'
            this.error = true
            return
        }

        console.log('creating user => ' + this.user.username)
        RequestManager.postCreateUser(
            this.user,
            r => {
                console.log(r.data)
                DataManager.setUser(r.data)
                this.$router.push({ name: 'dashboard' })
            },
            r => {
                console.error(r)
                this.errorMessage = 'El usuario ya existe.'
                this.error = true
            }
        )
    }
}
</script>

<style scoped></style>
