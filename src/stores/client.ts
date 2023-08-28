import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', () => {
  const clientId = ref('')
  const clientRoom = ref('')

  const setClientId = (id: string) => {
    clientId.value = id
  }

  const setClientRoom = (room: string) => {
    clientRoom.value = room
  }

  return { clientId, setClientId, clientRoom, setClientRoom }
})
