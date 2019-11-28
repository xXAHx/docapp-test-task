<template>
    <div class="timer">
        {{ hours | two_digits }}:{{ minutes | two_digits }}:{{ seconds | two_digits }}
    </div>
</template>

<script>
    export default {
        name: "Timer",
        props: ['date'],
        data() {
            return {
                now: Math.trunc((new Date()).getTime() / 1000)
            }
        },
        filters: {
            two_digits: (value) => {
                if (value < 0) {
                    return '00';
                }
                if (value.toString().length <= 1) {
                    return `0${value}`;
                }
                return value;
            }
        },
        computed: {
            dateInMilliseconds() {
                return Math.trunc(Date.parse(this.date) / 1000)
            },
            seconds() {
                return (this.dateInMilliseconds - this.now) % 60;
            },
            minutes() {
                return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
            },
            hours() {
                return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
            },
        },
        mounted() {
            window.setInterval(() => {
                this.now = Math.trunc((new Date()).getTime() / 1000);
            },1000);
        },
    }
</script>

<style scoped>

</style>