<template>
  <div>
    <v-app-bar
      app
      absolute
      color="blue darken-2"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon
        @click="miniVariant = !miniVariant"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold"
        >Revista Cientifica</v-toolbar-title
      >
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
      <v-list dense nav class="py-0">
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
          v-bind:key="item.title"
          @click="action(item.action)"
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
    <v-main>
      <v-container
        class="fill-height"
        style="padding-top: 20px; height: 100%"
        fluid
      >
        <div v-if="showArticleList">
          <v-simple-table class="center absolute">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Titulo</th>
                  <th class="text-left">Palabras Claves</th>
                  <th class="text-left">Evaluacion</th>
                  <th class="text-left">Fecha Inicial</th>
                  <th class="text-left">Fecha Final</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.name">
                  <td>{{ item.title }}</td>
                  <td>{{ item.keywords }}</td>
                  <td>{{ item.evaluation }}</td>
                  <td>{{ item.start_date }}</td>
                  <td>{{ item.end_date }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
    import { Component, Vue } from "vue-property-decorator";
    import UserManager from "@/scripts/UserManager";
    import RequestManager from "@/scripts/RequestManager"

    @Component
    export default class Dashboard extends Vue {
        private permanent = true;
        private miniVariant = false;   
        showDashboard = false;
        showArticleList = false;
        showRevList = false;
        showPhotos = false;
        showAbout = false; 

        private items = [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', action: 1 },
            { title: 'Artículos', icon: 'mdi-file-document-outline', action: 2 },
            { title: 'Revision', icon: 'mdi-file-document-edit-outline', action: 3 },
            { title: 'Photos', icon: 'mdi-image', action: 4 },
            { title: 'About', icon: 'mdi-help-box', action: 5 },
        ];

        action(item: number){ 
            this.showAbout = this.showArticleList = this.showDashboard = this.showPhotos = this.showRevList = false;
            if(item == 1) this.showDashboard = true;
            else if(item == 2) this.showArticleList = true;
            else if(item == 3) this.showRevList = true;
            else if(item == 4) this.showPhotos = true;
            else this.showAbout = true;
        }


        data() {
            return{
                headers: [
                { text: 'Listado de Articulos (Nombre)', value: 'title', align: 'start' },
                { text: 'Id Del trabajo', value: 'id' },
                { text: 'Palabras Claves', value: 'keywords' },
                { text: 'Evaluacion', value: 'evaluation' },
                { text: 'Fecha Inicial', value: 'start_date' },
                { text: 'Fecha Final', value: 'end_date' },
                ],
                // tableData: RequestManager.getArticleList(),
            }
        }
    }
</script>