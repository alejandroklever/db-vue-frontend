<template>
    <v-container fluid>
        <v-col cols="12">
            <v-row align="center" justify="center">
                <LoginCard/>
            </v-row>
        </v-col>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import LoginCard from "@/components/Login/LoginCard.vue";

@Component ({
    components: {
        LoginCard
    }
})
export default class Login extends Vue {

}
</script>

<style scoped>

</style>