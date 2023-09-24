<template>
    <div data-theme="dracula">
        <div class="h-screen p-4">
            <div class="flex justify-between items-center m-2 mb-10">
                <h1 class="text-5xl ml-2"></h1>
                <div class="flex">
                    <button class="btn btn-error mr-2" @click="logout">logout</button>
                </div>
            </div>
            <div class="flex justify-between items-center m-2">
                <h1 class="text-5xl ml-2">Room</h1>
                <div class="flex">
                    <button class="btn btn-warning mr-2" @click="getRooms">Refresh</button>
                    <button class="btn btn-success" @click="showModal = true">Add</button>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="my-2 flex justify-center items-center" v-for="room in rooms">
                    <RouterLink :key="room.id" class="btn btn-info w-10/12 mr-5"
                        :to="{ name: 'chat', params: { room: room.id } }">
                        {{ room.name }}
                    </RouterLink>
                    <button class="btn btn-error w-1/12" @click="deleteRoom(room.id)">Delete</button>
                </div>
            </div>
        </div>
        <dialog class="modal" :class="{ 'modal-open': showModal }">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-2">Create Room</h3>
                <div class="form-control">
                    <input type="text" v-model="room" placeholder="Room Name" class="input input-bordered" />
                </div>
                <div class="modal-action">
                    <button @click="showModal = false" class="btn btn-neutral">Close</button>
                    <button @click="saveRoom" class="btn btn-success">Create</button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button @click="showModal = false">close</button>
            </form>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '@/router';

const showModal = ref(false);

type Room = {
    id: string;
    name: string;
}
const rooms = ref([] as Room[]);
const room = ref('');

const getRooms = async () => {
    const response = await axios.get('http://localhost:8080/room', {
        withCredentials: true
    });
    rooms.value = response.data;
}

const deleteRoom = async (id: string) => {
    await axios.delete('http://localhost:8080/room/' + id, {
        withCredentials: true
    });
    getRooms();
}

const saveRoom = async () => {
    await axios.post('http://localhost:8080/room', {
        name: room.value
    }, {
        withCredentials: true
    })
    getRooms();

    room.value = '';

    showModal.value = false;
}

const logout = async () => {
    const response = await axios.get('http://localhost:8080/auth/logout', {
        withCredentials: true
    })

    if (response.status === 200) {
        router.push({ name: 'login' });
    }
}
onMounted(() => {
    getRooms();
})
</script>

