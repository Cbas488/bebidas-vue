<script setup>
import { useFavoritosStore } from '@/stores/favoritos'
import Receta from '@/components/Receta.vue'

const favoritos = useFavoritosStore()
</script>

<template>
	<h1 class="text-6xl font-extrabold">Favoritos</h1>
	<p class="my-10 text-center text-2xl" v-if="favoritos.noFavoritos">
		No hay favoritos
	</p>
	<div
		v-else
		class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10 my-10"
	>
		<Receta
			v-for="receta in favoritos.favoritos"
			:key="receta.idDrink"
			:receta="receta"
		/>
	</div>
</template>
