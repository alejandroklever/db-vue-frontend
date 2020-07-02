<template>
  <div>
    <p>{{ username }}</p>
    <form v-on:submit.prevent="SayHello">
      <input type="text" v-model="user.name" placeholder="name">
      <button type="submit">Say Hello</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  @Prop() username!: string;

  private user: ModelUser = new ModelUser();

  SayHello(): void {
    console.log(`Hello ${this.user.name}`);
  }
}

class ModelUser {
  public name!: string;
}
</script>

<style scoped></style>
