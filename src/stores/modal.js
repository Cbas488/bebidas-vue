import { useFavoritosStore } from './favoritos'
import { useBebidasStore } from './bebidas'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useModalStore = defineStore('modal', () => {
    const favoritos = useFavoritosStore()
    const bebidas = useBebidasStore()
    const modal = ref(false)
    const textoBoton = computed(() => {
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Elimiar de favoritos' : 'Agregar favorito'
    })
    function handleClickModal() {
        modal.value = !modal.value
    }
    
    return {
        modal,
        textoBoton,
        handleClickModal
    }
})