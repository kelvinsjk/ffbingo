<script lang="ts">
	import List from '$lib/List.svelte';
</script>

<svelte:head>
	<title>Restaurants</title>
</svelte:head>

<div class="prose mt-4">
	<h1>Restaurants</h1>
	<List />
</div>

<style>
	.prose {
		padding-inline: 1rem;
		margin-inline: auto;
		max-width: 80vw;
	}
</style>
