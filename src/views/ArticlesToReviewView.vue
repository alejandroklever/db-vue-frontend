<template>
    <div>
        <v-sheet tile height="54" class="d-flex">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="type"></v-select>
            <v-select
                v-model="mode"
                :items="modes"
                dense
                outlined
                hide-details
                label="event-overlap-mode"
                class="ma-2"
            ></v-select>
            <v-select
                v-model="weekday"
                :items="weekdays"
                dense
                outlined
                hide-details
                label="weekdays"
                class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet height="600">
            <v-calendar
                ref="calendar"
                v-model="value"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                :event-color="getEventColor"
                @change="getEvents"
            ></v-calendar>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ArticlesToReviewView extends Vue {
    private type = 'month'
    private types = ['month', 'week', 'day', '4day']
    private mode = 'stack'
    private modes = ['stack', 'column']
    private weekday = [0, 1, 2, 3, 4, 5, 6]
    private weekdays = [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ]
    private value = ''
    private events = []
    private colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    private names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

    getEvents({ start, end }: { start: any; end: any }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
            const allDay = this.rnd(0, 3) === 0
            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
            const second = new Date(first.getTime() + secondTimestamp)

            events.push({
                name: this.names[this.rnd(0, this.names.length - 1)],
                start: first,
                end: second,
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: !allDay,
            })
        }

        this.events = events as never[]
    }
    getEventColor(event: any) {
        return event.color
    }

    rnd(a: number, b: number): number {
        return Math.floor((b - a + 1) * Math.random()) + a
    }
}
</script>

<style scoped></style>
