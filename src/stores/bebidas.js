import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'
import { useModalStore } from './modal'

export const useBebidasStore = defineStore('bebidas', () => {
    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })
    const recetas = ref([])
    const receta = ref({})
    const noRecetas = computed(() => {
        return recetas.value.length === 0
    })

    onMounted(async () => {
        const {data: {drinks}} = await APIService.obtenerCategorias()

        categorias.value = drinks
    })

    async function obtenerRecetas() {
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
        recetas.value = drinks
    }

    async function seleccionarBebida(id) {
        const {data: {drinks}} = await APIService.buscarReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta,
        noRecetas
    }
})