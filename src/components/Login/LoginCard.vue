<template>
  <v-container fluid>
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-col class="mb-5 offset-2" cols="8">
          <h1 class="text-center font-weight-bold">Revista Cientifica</h1>
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
            :type="showPassword ? 'text': 'password'"
            rounded
            outlined
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-row justify="center">
            <v-checkbox
              label="Administrdor"
              v-model="isAdmin"
              >
            </v-checkbox>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row align="end" justify="center">
            <v-card-actions>
              <v-btn
                rounded
                color="primary"
                @click="login()"
                >
                <span>Autenticarse</span>
              </v-btn>
              <v-btn
                rounded
                color="default"
                >
                <span>Registrarse</span>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const badInputMessage = "Usuario no reconocido";
const UserTypes: string[] = ["User", "Admin"]
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component
export default class LoginCard extends Vue {
  private showPassword = false;
  private isAdmin = false;
  private usernameOrEmail!: string;
  private password!: string;

  login(): void {
    if (pattern.test(this.usernameOrEmail)) {
      console.log("logged with email: " + this.usernameOrEmail);
      // login with email
    } else {
      console.log("logged with username: " + this.usernameOrEmail);
      // login with password
    }
    console.log('password: ' + this.password);
  }

  signUp(): void {
    // go to signUp View
  }

}
</script>

<style scoped></style>
