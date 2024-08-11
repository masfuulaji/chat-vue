<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div data-theme="dracula">
        <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-2 text-center text-2xl font-bold text-indigo-400 leading-9 tracking-tight">Sign Up</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium leading-6">Username</label>
                        <div class="mt-2">
                            <input id="username" v-model="formLogin.username" type="text" required
                                class="block w-full rounded-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6">Email</label>
                        <div class="mt-2">
                            <input id="email" v-model="formLogin.email" type="text" required
                                class="block w-full rounded-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6">Password</label>
                        </div>
                        <div class="mt-2">
                            <input id="password" v-model="formLogin.password" type="password"
                                autocomplete="current-password" required
                                class="block w-full rounded-md border-0 py-2 px-2 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div>
                        <button @click="login" type="button"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            Up</button>
                        <button @click="RouteBack" type="button"
                            class="mt-4 flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import axios from 'axios';
import { reactive } from 'vue';

const formLogin = reactive({
    username: '',
    password: '',
    email: ''
});

const login = async () => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            name: formLogin.username,
            email: formLogin.email,
            password: formLogin.password
        }, {
            withCredentials: true
        })

        if (response.status === 200) {
            router.push({ name: 'login' });
        }
    } catch (error) {
        console.log(error);
    }
}
const RouteBack = () => {
    router.push({ name: 'login' });
}
</script>
