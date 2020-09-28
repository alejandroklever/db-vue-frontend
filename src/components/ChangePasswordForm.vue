<template>
    <v-form @submit.prevent="changePassword">
        <v-row justify="center">
            <v-col cols="6">
                <v-text-field
                    label="Contraseña Actual"
                    v-model="currentPassword"
                    :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    rounded
                    outlined
                    @click:append="showCurrentPassword = !showCurrentPassword"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="Contraseña Nueva"
                    v-model="newPassword"
                    :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showNewPassword ? 'text' : 'password'"
                    rounded
                    outlined
                    @click:append="showNewPassword = !showNewPassword"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-btn type="submit" color="primary">Cambiar</v-btn>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ChangePasswordForm extends Vue {
    private showCurrentPassword = false
    private showNewPassword = false
    private currentPassword = ''
    private newPassword = ''

    changePassword(): void {
        //
    }
}
</script>

<style scoped></style>
