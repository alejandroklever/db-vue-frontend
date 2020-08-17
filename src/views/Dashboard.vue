<template>
    <div>
        <v-app-bar app
                    absolute
                    color="blue darken-2"
                    dark
                    scroll-target="#scrolling-techniques-6"
        >
            <v-app-bar-nav-icon @click="miniVariant = !miniVariant"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">Revista Cientifica</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>

        </v-app-bar>
        <v-navigation-drawer
                app
                floating
                color="blue darken-2"
                :mini-variant="miniVariant"
                :permanent="false"
                dark
        >
            <v-list
                    dense
                    nav
                    class="py-0"
            >
                <v-list-item two-line class="px-0">
                    <v-list-item-avatar>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Application</v-list-item-title>
                        <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { Component, Vue } from "vue-property-decorator";
    import UserManager from "@/scripts/UserManager";

    @Component
    export default class Dashboard extends Vue {
        private permanent = true;
        private miniVariant = false;
        private items = [
            { title: 'Dashboard', icon: 'mdi-view-dashboard' },
            { title: 'Artículos', icon: 'mdi-file-document-outline' },
            { title: 'Revision', icon: 'mdi-file-document-edit-outline' },
            { title: 'Photos', icon: 'mdi-image' },
            { title: 'About', icon: 'mdi-help-box'},
        ];

    }
</script>