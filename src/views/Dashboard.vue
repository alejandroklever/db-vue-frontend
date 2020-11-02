<template>
    <div>
        <app-bar-and-navigation-drawer :on-load-user="redirect"></app-bar-and-navigation-drawer>
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
import DataManager from '@/scripts/data-manager'

@Component({
    components: {
        'app-bar-and-navigation-drawer': AppBarAndNavigationDrawer,
        'user-configuration': UserConfigurationView,
        'list-articles-view': ListArticlesView,
    },
})
export default class Dashboard extends Vue {
    redirect() {
        const id = DataManager.user?.author?.id
        this.$router.push({ name: 'list-article-in-review' })
        // this.$router.push({ name: 'list-article', params: { authorId: id?.toString() || '0' } })
    }
}
</script>
