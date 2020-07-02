<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
<!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <Testing username="Alejandro Klever"></Testing>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Testing from '@/components/Testing';

export default {
  name: "Home",
  components: {
    Testing,
    // HelloWorld
  }
};
</script>
