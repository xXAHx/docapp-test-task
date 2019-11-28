<template>
    <div class="container-fluid py-4">
        <div>
            <h1>Room {{ room.code }}</h1>
        </div>
        <div>
            {{ room.appointment.start_date }}
        </div>
        <div>
            (BMI)
            (
            HT: {{ room.appointment.vital_signs.height_ft }}'{{ room.appointment.vital_signs.height_in }}'',
            WT: {{ room.appointment.vital_signs.weight }} lbs.,
            BMI: {{ room.appointment.vital_signs.bmi }}
            )
        </div>
        <div class="mb-4">
            {{ room.appointment.is_doctor ? 'Dr.' : room.appointment.gender === 'Female' ? 'Ms.' : 'Mr.' }}
            {{ room.appointment.first_name }}
            {{ room.appointment.last_name }},
            <template v-if="room.appointment.birthday">
                {{ getAge(room.appointment.birthday) }} years,
            </template>
            {{ room.appointment.gender[0] }}
        </div>
        <div class="mb-4" v-if="!showTabs">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="selectAll" v-model="selectAll">
                <label class="form-check-label" for="selectAll">
                    Select All
                </label>
            </div>
            <div class="form-check" v-for="form in forms" :key="form.id">
                <input class="form-check-input" type="checkbox" :value="form" :id="`form-${form.id}`" v-model="checkedForms">
                <label class="form-check-label" :for="`form-${form.id}`">
                    {{ form.title }}
                </label>
            </div>
        </div>
        <div class="mb-4" v-if="checkedForms.length > 0">
            <button class="btn btn-success" @click="showForms">
                {{ !showTabs ? 'Sign' : 'Select other forms' }}
            </button>
        </div>
        <div v-if="showTabs">
            <h2>Form tabs</h2>
            <form-tabs
                    :forms="checkedForms"
                    :patient="getInitials()"
            >
            </form-tabs>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import FormTabs from "../components/FormTabs.vue";

    export default {
        name: "RoomDetails",
        components: { FormTabs },
        data() {
            return {
                room: {
                    code: Number,
                    appointment: {
                        code: String,
                        first_name: String,
                        last_name: String,
                        gender: String,
                        birthday: String,
                        start_date: String,
                        start_time: String,
                        doctor_title: String,
                        assistant: String,
                        vital_signs: {
                            height_ft: String,
                            height_in: String,
                            weight: String,
                            bmi: String,
                        },
                        status: {
                            code: String,
                            title: String,
                        },
                        update_time: Number
                    }
                },
                forms: [],
                checkedForms: [],
                showTabs: false,
            };
        },
        methods: {
            getData(url) {
                return new Promise((resolve, reject) => {
                    fetch(`http://localhost:9000/api/${url}`).then(response => {
                        resolve(response.json());
                    }, error => {
                        reject(error);
                    })
                })
            },
            getRoom(id) {
                this.getData('rooms.json').then((resolve) => {
                    this.room = resolve.find(item => item.code === Number(id));
                })
            },
            getForms() {
                this.getData('consent-forms.json').then((resolve) => {
                    this.forms = resolve;
                })
            },
            getFormDetails() {
                this.checkedForms.forEach((elem, index) => {
                    this.getData(`consent-form-details/${elem.code}.json`).then((resolve) => {
                        this.$set(this.checkedForms[index], 'details', resolve);
                    });
                });
            },
            getInitials() {
                return this.room.appointment.first_name[0] + this.room.appointment.last_name[0]
            },
            getAge(date) {
                return moment().diff(moment(date, 'MM/DD/YYYY'), 'years');
            },
            showForms: async function() {
                this.getFormDetails();
                this.showTabs = !this.showTabs;
            }
        },
        computed: {
            selectAll: {
                get: function () {
                    return this.forms ? this.checkedForms.length === this.forms.length : false;
                },
                set: function (value) {
                    let selected = [];
                    if (value) {
                        this.forms.forEach(function (form) {
                            selected.push(form);
                        });
                    }
                    this.checkedForms = selected;
                }
            },
        },
        created() {
            this.getRoom(this.$route.params.id);
            this.getForms();
        }
    }
</script>

<style scoped>

</style>