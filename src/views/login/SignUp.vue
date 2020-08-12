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
                                v-model="user.username"
                                rounded
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Email"
                                v-model="user.email"
                                rounded
                                outlined
                        ></v-text-field>

                        <v-text-field
                            label="Contraseña"
                            v-model="user.password"
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
                        <v-fade-transition origin="center center">
                            <v-row justify="center" v-show="badRegister">
                                <label class="red--text">Credenciales invalidas</label>
                            </v-row>
                        </v-fade-transition>
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
    import RequestManager from "@/scripts/RequestManager";

    @Component
    export default class SignUp extends Vue {
        private showPassword = false;
        private showPassword2 = false;
        private badRegister = false;
        private password2 = '';

        private user = {
            username: '',
            email: '',
            password: '',
            isSuperuser: false,
        }

        createUser(): void {
            let matchedPasswords = this.user.password == this.password2;
            let validEmail = emailPattern.test(this.user.email);

            if (matchedPasswords && validEmail) {
                this.badRegister = false;
                RequestManager.postCreateUser(this.user);
                // this.$router.push({ name: 'dashboard' });
            }
            else {
                this.badRegister = true;
            }
        }
    }
</script>

<style scoped>

</style>