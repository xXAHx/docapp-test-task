<template>
    <div class="row">
        <div class="col-md-4 mb-4" v-for="room in rooms" :key="room.code">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">
                        Room {{ room.code }} {{ room.appointment.code }}
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        {{ room.appointment.first_name }} {{ room.appointment.last_name }}
                    </h6>
                    <div>
                        {{ room.status.title }}
                    </div>
                    <div>
                        {{ getAppointmentTime(room.appointment.start_time) }}
                    </div>
                    <timer :date="`${room.appointment.start_date} ${room.appointment.start_time}`"></timer>
                    <div>
                        D: {{ room.appointment.doctor_title }}
                    </div>
                    <div>
                        A: {{ room.appointment.assistant }}
                    </div>
                </div>
                <div class="card-footer">
                    <router-link class="card-link" :to="`/room/${room.code}`">Go to room</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import Timer from "../components/Timer.vue";

    export default {
        name: "RoomsList",
        components: { Timer },
        data() {
            return {
                rooms: [],
            };
        },
        methods: {
            async getRooms() {
                let response = await fetch('http://localhost:9000/api/rooms.json');
                if (response.ok) {
                    this.rooms = await response.json();
                } else {
                    alert("Error: " + response.status);
                }
            },
            getAppointmentTime(time) {
                return moment(time, 'HH:mm a').format('HH:mm A');
            },
        },
        created() {
            this.getRooms();
        }
    }
</script>

<style scoped>

</style>