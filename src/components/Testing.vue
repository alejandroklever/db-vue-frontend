<template>
    <div>
        <p>{{ username }}</p>

        <ul>
            <li v-for="p in userList" v-bind:key="user.name">
                {{p.name}}
            </li>
        </ul>

        <form v-on:submit.prevent="AddPerson">
            <label>
                <input type="text" v-model="user.name" placeholder="name">
            </label>
            <button type="submit">Add</button>
        </form>



    </div>
</template>

<script lang="ts">
    import { Component, Prop, Model, Vue } from "vue-property-decorator";

    class Person {
        public name!: string;
    }

    @Component
    export default class Testing extends Vue {
        @Prop() username!: string;

        private user: Person = new Person();
        private userList: Person[] = [];

        AddPerson(): void {
            let newPerson: Person = new Person();
            newPerson.name = this.user.name;
            this.userList.push(newPerson);
        }
    }
</script>

<style scoped></style>
