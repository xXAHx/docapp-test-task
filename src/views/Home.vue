<template>
    <div class="container-fluid py-4">
        <rooms-list></rooms-list>
    </div>
</template>

<script>
    import RoomsList from "./RoomsList.vue";

    export default {
        name: "Home",
        components: { RoomsList },
    }
</script>

<style scoped>

</style>