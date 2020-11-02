<template>
    <div>
        <app-bar-and-navigation-drawer :on-load-user="redirect"></app-bar-and-navigation-drawer>
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
        console.log(DataManager.user?.referee || '-')
        this.$router.push({
            name: 'list-reviews',
            params: { refereeId: DataManager.user?.referee?.id.toString() || '0' },
        })
        // this.$router.push({ name: 'list-article', params: { authorId: id?.toString() || '0' } })
    }
}
</script>
