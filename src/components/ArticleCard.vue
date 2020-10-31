<template>
  <v-card>
    <v-card-title> {{ article.title }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Article, User } from '@/scripts/models'

@Component
export default class ArticleCard extends Vue {
  @Prop() article!: Article
  @Prop() authors!: User[]
}
</script>

<style scoped></style>