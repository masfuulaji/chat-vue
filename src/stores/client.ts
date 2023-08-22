import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', () => {
  const clientId = ref('')

  const setClientId = (id: string) => {
    clientId.value = id
  }

  return { clientId, setClientId }
})
