<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useBebidasStore } from '../stores/bebidas'
import { useNotificacionStore } from '@/stores/notificaciones'

const route = useRoute()
const paginaInicio = computed(() => route.name === 'inicio')
const store = useBebidasStore()
const notificaciones = useNotificacionStore()

const handleSubmit = () => {
	if (Object.values(store.busqueda).includes('')) {
		notificaciones.$patch({
			texto: 'Todos los campos son obligatorios',
			error: true,
			mostrar: true,
		})
		return
	}

	store.obtenerRecetas()
}
</script>

<template>
	<header class="bg-slate-800" :class="{ header: paginaInicio }">
		<div class="mx-auto container px-5 py-16">
			<div class="flex justify-between items-center">
				<div>
					<RouterLink
						:to="{
							name: 'inicio',
						}"
					>
						<img class="w-32" src="/img/logo.svg" alt="Logotipo" />
					</RouterLink>
				</div>
				<nav class="flex gap-4 text-white">
					<RouterLink
						class="uppercase font-bold"
						:to="{
							name: 'inicio',
						}"
						active-class="text-orange-500"
					>
						Inicio
					</RouterLink>

					<RouterLink
						class="uppercase font-bold"
						:to="{
							name: 'favoritos',
						}"
						active-class="text-orange-500"
					>
						Favoritos
					</RouterLink>
				</nav>
			</div>
			<form
				v-if="paginaInicio"
				class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
				@submit.prevent="handleSubmit"
			>
				<div class="space-y-4">
					<label
						class="block text-white uppercase font-extrabold text-lg"
						for="ingrediente"
						>Nombre o Ingredientes</label
					>
					<input
						class="p-3 w-full rounded-lg focus:outline-none"
						id="ingrediente"
						type="text"
						placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc."
						v-model="store.busqueda.nombre"
					/>
				</div>

				<div class="space-y-4">
					<label
						class="block text-white uppercase font-extrabold text-lg"
						for="categoria"
						>Categoria</label
					>
					<select
						class="w-full p-3 rounded-lg focus:outline-none"
						id="categoria"
						v-model="store.busqueda.categoria"
					>
						<option value="">-- Seleccione --</option>
						<option
							v-for="categoria in store.categorias"
							:key="categoria.strCategory"
							:value="categoria.strCategory"
						>
							{{ categoria.strCategory }}
						</option>
					</select>
				</div>

				<input
					type="submit"
					value="Buscar recetas"
					class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
				/>
			</form>
		</div>
	</header>
</template>

<style>
.header {
	background-image: url('/img/bg.jpg');
	background-size: cover;
	background-position: center;
}
</style>
