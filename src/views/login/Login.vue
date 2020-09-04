<template>
    <v-container class="blue darken-2" fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="mx-auto" max-width="400">
                    <v-spacer></v-spacer>

                    <v-col class="mb-5 offset-2" cols="8">
                        <h1 class="text-center font-weight-bold">
                            Revista Cientifica
                        </h1>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col class="offset-1" cols="10">
                        <v-text-field
                            label="Nombre de Usuario"
                            v-model="usernameOrEmail"
                            rounded
                            outlined
                        ></v-text-field>

                        <v-text-field
                            label="Contraseña"
                            v-model="password"
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
                                <label class="red--text">{{ this.badInputMessage }}</label>
                            </v-row>
                        </v-fade-transition>
                    </v-col>

                    <v-col cols="12">
                        <v-row align="end" justify="center">
                            <v-card-actions>
                                <v-btn rounded color="primary" @click="login()">
                                    <span>Autenticarse</span>
                                </v-btn>
                                <v-btn rounded color="secondary" :to="{ name: 'sign-up' }">
                                    <span>Registrarse</span>
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import { AxiosResponse } from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import { emailPattern } from '@/scripts/Constants'
import RequestManager from '@/scripts/RequestManager'
import UserManager from '@/scripts/UserManager'

@Component
export default class Login extends Vue {
    private badInputMessage = ''
    private badLogin = false
    private showPassword = false
    private isAdmin = false
    private usernameOrEmail!: string
    private password!: string

    login(): void {
        const onResponse = (r: AxiosResponse<any>) => {
            if (UserManager.instance.currentUser != undefined) this.$router.push({ name: 'dashboard' })
            else {
                this.badInputMessage = 'Credenciales inválidas. Revise su usuario y contraseña.'
                this.badLogin = true
            }
        }

        const userData: any = { password: this.password }
        if (!emailPattern.test(this.usernameOrEmail)) userData.username = this.usernameOrEmail
        else userData.email = this.usernameOrEmail
        RequestManager.getLoginUser(userData, onResponse)
    }
}
</script>

<style scoped></style>
