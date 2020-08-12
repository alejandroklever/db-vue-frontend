<template>
    <v-container class="blue darken-2" fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card
                    class="mx-auto"
                    max-width="400"
                >
                    <v-col class="mb-5 offset-2" cols="8">
                        <h1 class="text-center font-weight-bold">Regístrese</h1>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col class="offset-1" cols="10">
                        <v-text-field
                                label="Nombre de Usuario"
                                v-model="username"
                                rounded
                                outlined
                        ></v-text-field>

                                <v-text-field
                                        label="Email"
                                        v-model="email"
                                        rounded
                                        outlined
                                ></v-text-field>
                                <v-text-field
                                        label="Segundo Email (Opcional)"
                                        v-model="secondEmail"
                                        rounded
                                        outlined
                                ></v-text-field>

                                <v-text-field
                                    label="Contraseña"
                                    v-model="password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text': 'password'"
                                    rounded
                                    outlined
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>
                                <v-text-field
                                    label="Repita la contraseña"
                                    v-model="password2"
                                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword2 ? 'text': 'password'"
                                    rounded
                                    outlined
                                    @click:append="showPassword2 = !showPassword2"
                                ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-row align="end" justify="center">
                            <v-card-actions>
                                <v-btn
                                        width="150"
                                    rounded
                                    color="primary"
                                    @click="createUser()"
                                >
                                    <span>Registrar</span>
                                </v-btn>
                                <v-btn
                                        width="150"
                                    rounded
                                    color="secondary"
                                    :to="{name: 'login'}"
                                >
                                    <span>Cancelar</span>
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
    import { Component, Vue } from "vue-property-decorator";
    import { emailPattern } from "@/scripts/Constants";

    @Component
    export default class LoginCard extends Vue {
        private showPassword = false;
        private showPassword2 = false;
        private username!: string;
        private email!: string;
        private secondEmail!: string;
        private password!: string;
        private password2!: string;

        createUser(): void {
            let unmatchedPasswords = false;
            let invalidEmail = false;
            let invalidSecondEmail = false;

            if (this.password != this.password2)
                unmatchedPasswords = true;

            if (!emailPattern.test(this.email))
                invalidEmail = true;

            if (this.secondEmail != undefined && this.secondEmail != "" && !emailPattern.test(this.secondEmail))
                invalidSecondEmail = true;

            if (!unmatchedPasswords && !invalidEmail && !invalidSecondEmail)
                console.log([this.username, this.email, this.secondEmail, this.password]);
            else
                console.log("Bad Register")
        }
    }
</script>

<style scoped>

</style>