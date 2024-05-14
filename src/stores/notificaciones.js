import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useNotificacionStore = defineStore('notificacion', () => {
    const mostrar = ref(false)
    const texto = ref('')
    const error = ref(false)

    watch(mostrar, () => {
        if(mostrar.value){
            setTimeout(() => {
                texto.value = ''
                error.value = false
                mostrar.value = false
            }, 3000)
        }
    })

    return {
        texto,
        error,
        mostrar
    }
})