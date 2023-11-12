<script lang="ts">
	import List from '$lib/List.svelte';
	import { answers } from '$lib/answers';
	const revealed = answers.at(-1)!.revealed;
</script>

<svelte:head>
	<title>Restaurants</title>
</svelte:head>

<main class="grid justify-items-center">
	<div class="prose mt-4">
		<h2>Restaurants left</h2>
		<List complement={true} {revealed} />
		<h2>Restaurants visited</h2>
		<List {revealed} />
	</div>
</main>

<style>
	.prose {
		max-width: 600px;
		width: 100%;
	}

	main {
		margin: 1rem;
	}
</style>
