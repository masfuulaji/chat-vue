<template>
    <div data-theme="dracula" class="flex justify-center items-center h-screen">
        <RouterLink class="btn btn-primary mx-2" :to="{ name: 'chat', params: { room: 'one' } }">Room 1</RouterLink>
        <RouterLink class="btn btn-primary mx-2" :to="{ name: 'chat', params: { room: 'two' } }">Room 2</RouterLink>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Home',
    setup() {
    },
};
</script>

