import { defineStore} from 'pinia'
import { useBebidasStore } from './bebidas'
import { ref, watch, onMounted, computed } from 'vue'
import { useModalStore } from './modal'
import { useNotificacionStore } from './notificaciones'

export const useFavoritosStore = defineStore('favoritos', () => {
    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificacion = useNotificacionStore()
    const favoritos = ref([])
    const noFavoritos = computed(() => {
        return favoritos.value.length === 0
    })

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    const sincronizarLocalStorage = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    const handleClickFavorito = () => {
        if(existeFavorito(bebidas.receta.idDrink)){
            eliminarFavorito()
        } else {
            agregarFavorito()
        }
        modal.modal = false
    }

    function agregarFavorito() {
        favoritos.value.push(bebidas.receta)
        notificacion.mostrar = true
        notificacion.texto = 'Se agrego a favoritos.'
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)
        notificacion.mostrar = true
        notificacion.texto = 'Eliminado de favoritos'
    }

    function existeFavorito() {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    return {
        handleClickFavorito,
        favoritos,
        noFavoritos,
        existeFavorito
    }
})