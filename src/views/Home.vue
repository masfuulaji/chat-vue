<template>
    <form @submit.prevent="sendData">
        <p for="message">{{ message }}</p>
        <input v-model="input" />

        <button type="submit" :disabled="isLoading">Submit</button>
    </form>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import WebSocket from 'websocket';

export default {
    name: 'WebSocketComponent',
    setup() {
        const ws = WebSocket.w3cwebsocket;
        const socket = new ws('ws://localhost:8080/ws');
        const message = ref('');
        const input = ref('');
        const isLoading = ref(false);

        const sendData = () => {
            socket.send(input.value);
        };

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            if (typeof event.data === 'string') {
                message.value = JSON.parse(event.data).body;
            }
        };

        onBeforeUnmount(() => {
            socket.close();
        });

        return {
            message,
            sendData,
            isLoading,
            input,
        };
    },
};
</script>
