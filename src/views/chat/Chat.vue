<template>
    <div data-theme="light" class="flex-1 p:2 sm:p-6 flex flex-col h-screen">
        <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 mb-auto">
            <div class="relative flex items-center space-x-4">
                <div class="relative">
                    <span class="absolute text-green-500 right-0 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                    </span>
                    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                        alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full">
                </div>
                <div class="flex flex-col leading-tight">
                    <div class="text-2xl mt-1 flex items-center">
                        <span class="text-gray-700 mr-3">Abdul</span>
                    </div>
                    <span class="text-lg text-gray-600">Junior Developer</span>
                </div>
            </div>
        </div>
        <div ref="scrollThis"
            class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <div v-for="(item, index) in messageHistory" :key="index" class="chat-message">
                <div class="flex justify-center">
                    <div v-if="item.message_type === 2" class="flex flex-col space-y-2 text-xs  order-1 items-center">
                        <div><span class="px-2 py-1 rounded-lg inline-block bg-gray-300 text-gray-600 ">
                                {{ item.content }}
                            </span></div>
                    </div>
                </div>
                <div v-if="item.sender_id === store.clientId && item.message_type === 1" class="flex items-end justify-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                {{ item.content }}
                            </span></div>
                    </div>
                </div>
                <div v-else-if="item.sender_id !== store.clientId && item.message_type === 1" class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                {{ item.content }}
                            </span></div>
                    </div>
                </div>
            </div>
            <div v-for="(item, index) in message" :key="index" class="chat-message">
                <div class="flex justify-center">
                    <div v-if="item.message_type === 2" class="flex flex-col space-y-2 text-xs  order-1 items-center">
                        <div><span class="px-2 py-1 rounded-lg inline-block bg-gray-300 text-gray-600 ">
                                {{ item.body }}
                            </span></div>
                    </div>
                </div>
                <div v-if="item.sender === store.clientId && item.message_type === 1" class="flex items-end justify-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                {{ item.body }}
                            </span></div>
                    </div>
                </div>
                <div v-else-if="item.sender !== store.clientId && item.message_type === 1" class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                {{ item.body }}
                            </span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div class="relative flex">
                <input type="text" placeholder="Write your message!" v-model="input" @keyup.enter="sendData"
                    class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3">
                <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <button type="button"
                        class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="h-6 w-6 text-gray-600">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                            </path>
                        </svg>
                    </button>
                    <button type="button"
                        class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="h-6 w-6 text-gray-600">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                    </button>
                    <button type="button" @click="sendData" :disabled="isLoading"
                        class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                        <span class="font-bold">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="h-6 w-6 ml-2 transform rotate-90">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { useClientStore } from '@/stores/client';
import WebSocket from 'websocket';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Message {
    body: string;
    message_type: number;
    sender: string;
    type: number;
}

interface HistoryMessage {
    content: string;
    message_type: number;
    sender_id: string;
}

export default {
    name: 'WebSocketComponent',
    setup() {
        const router = useRoute();
        const room = router.params.room;
        const ws = WebSocket.w3cwebsocket;
        const socket = new ws(`${import.meta.env.VITE_API_WEBSOCKET_URL}/ws?room=` + room);
        const message = ref<Message[]>([]);
        const messageHistory = ref<HistoryMessage[]>([]);
        const input = ref('');
        const isLoading = ref(false);
        const scrollThis = ref<HTMLElement | null>(null);

        const store = useClientStore();

        const getHistoryMessage = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/message?room=` + room, {
                withCredentials: true
            });
            messageHistory.value = response.data;
        };

        const sendData = () => {
            if (input.value === '') {
                return;
            }

            const message = {
                message: input.value,
                room: store.clientRoom,
                sender: localStorage.getItem('user_id'),
            }

            socket.send(JSON.stringify(message));
            input.value = '';
        };

        socket.onopen = () => {
            console.log('open');
        };

        socket.onmessage = (event) => {
            if (typeof event.data === 'string') {
                let data = JSON.parse(event.data);
                if (data.message_type === 3) {
                    store.setClientId(localStorage.getItem('user_id') as string);
                    store.setClientRoom(data.room);
                    return;
                }

                message.value.push(data);
                setTimeout(() => {
                    scrollMesage();
                }, 100);
            }
        };

        onMounted(() => {
            getHistoryMessage();
        });

        onBeforeUnmount(() => {
            socket.close();
            store.setClientId('');
            store.setClientRoom('');
        });

        const scrollMesage = () => {
            if (scrollThis.value) {
                scrollThis.value.scrollTop = scrollThis.value.scrollHeight;
            }
        }

        return {
            message,
            messageHistory,
            sendData,
            isLoading,
            input,
            scrollThis,
            store
        };
    },
};
</script>

<style>
.scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
}
</style>
