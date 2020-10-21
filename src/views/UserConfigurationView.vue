<template>
    <v-col>
        <v-card class="mx-auto" elevation="0">
            <v-row justify="center">
                <v-card-title>
                    <h2>Información del Usuario</h2>
                    <v-icon color="black" size="35">mdi-account</v-icon>
                </v-card-title>
            </v-row>
            <v-spacer></v-spacer>
            <v-row justify="center">
                <v-col offset="2" cols="5">
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
                                <user-info-form></user-info-form>
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

import UserInfoForm from '@/components/user-edition/UserInfoForm.vue'
import ChangePasswordForm from '@/components/user-edition/ChangePasswordForm.vue'

@Component({
    components: {
        'user-info-form': UserInfoForm,
        'change-password-form': ChangePasswordForm
    },
})
export default class UserConfigurationView extends Vue {
    private tab = null

    get user() {
        return DataManager.user
    }
}
</script>

<style scoped></style>
