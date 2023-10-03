<script lang="ts">
	import List from '$lib/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const revealed = data.revealed;
</script>

<svelte:head>
	<title>Restaurants</title>
</svelte:head>

<div class="prose mt-4">
	<h2>Restaurants left</h2>
	<List complement={true} {revealed} />
	<h2>Restaurants visited</h2>
	<List {revealed} />
</div>

<style>
	.prose {
		padding-inline: 1rem;
		margin-inline: auto;
		max-width: 80vw;
	}
</style>
