<template>
    <v-container class="blue darken-2" fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="mx-auto" max-width="400">
                    <v-spacer></v-spacer>

                    <v-col class="mb-5 offset-2" cols="8">
                        <v-card-title class="text-center font-weight-bold">
                            Revista Cientifica
                        </v-card-title>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-form @submit.prevent="login">
                        <v-col class="offset-1" cols="10">
                            <v-text-field
                                label="Nombre de Usuario"
                                v-model="usernameOrEmail"
                                :prepend-icon="'mdi-account'"
                                rounded
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Contraseña"
                                v-model="password"
                                :prepend-icon="'mdi-lock'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                rounded
                                outlined
                                @click:append="showPassword = !showPassword"
                            ></v-text-field>

                            <v-row justify="center">
                                <v-checkbox label="Administrdor" v-model="isAdmin"> </v-checkbox>
                            </v-row>

                            <v-fade-transition origin="center center">
                                <v-row justify="center" v-show="badLogin">
                                    <label class="red--text">{{ this.errorMessage }}</label>
                                </v-row>
                            </v-fade-transition>
                        </v-col>

                        <v-col cols="12">
                            <v-row align="end" justify="center">
                                <v-card-actions>
                                    <v-btn rounded color="primary" type="submit">
                                        <span>Autenticar</span>
                                    </v-btn>
                                    <v-btn rounded color="secondary" :to="{ name: 'sign-up' }">
                                        <span>Registrar</span>
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
import { AxiosResponse } from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import { emailPattern } from '@/scripts/tools/constants'
import RequestManager from '@/scripts/request-manager'
import DataManager from '../../scripts/data-manager'

@Component
export default class Login extends Vue {
    private errorMessage = ''
    private badLogin = false
    private showPassword = false
    private isAdmin = false
    private usernameOrEmail = ''
    private password = ''

    login(): void {
        const onResponse = (r: AxiosResponse) => {
            console.log(r.data)
            DataManager.setUser(r.data)
            this.$router.push({ name: 'dashboard' })
        }

        const onCatch = (r: any) => {
            this.errorMessage = 'Usuario o contraseña incorrectos'
            this.password = ''
            this.badLogin = true
            console.log(r)
        }

        const userData: any = { password: this.password }
        if (!emailPattern.test(this.usernameOrEmail)) userData.username = this.usernameOrEmail
        else userData.email = this.usernameOrEmail
        RequestManager.postLoginUser(userData, onResponse, onCatch)
    }
}
</script>

<style scoped></style>
