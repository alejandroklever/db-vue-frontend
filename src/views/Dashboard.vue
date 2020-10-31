<template>
    <div>
        <app-bar-and-navigation-drawer></app-bar-and-navigation-drawer>
        <v-main>
            <user-configuration v-if="false"></user-configuration>
            <list-articles-view v-if="true"></list-articles-view>
        </v-main>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import UserConfigurationView from '@/views/UserConfigurationView.vue'
import ListArticlesView from '@/views/ListArticlesView.vue'
import AppBarAndNavigationDrawer from '@/components/AppBarAndNavigationDrawer.vue'

@Component({
    components: {
        'app-bar-and-navigation-drawer': AppBarAndNavigationDrawer,
        'user-configuration': UserConfigurationView,
        'list-articles-view': ListArticlesView,
    },
})
export default class Dashboard extends Vue {
    private miniVariant = false

    private user = {
        username: '',
        institution: '',
    }

    created() {
        this.$router.push({ name: 'list-articles' })
    }
}
</script>
