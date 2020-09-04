<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <ul>
                    <li v-for="person in userList" v-bind:key="person.name">
                        {{ person.name }}
                    </li>
                </ul>

                <form v-on:submit.prevent="AddPerson">
                    <label>
                        <input type="text" v-model="user.name" placeholder="name" />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

class Person {
    public name!: string
}

@Component
export default class Testing extends Vue {
    @Prop() message!: string
    private user: Person = new Person()
    private userList: Person[] = []

    AddPerson(): void {
        const newPerson: Person = new Person()
        newPerson.name = this.user.name
        this.userList.push(newPerson)
    }
}
</script>

<style scoped></style>
