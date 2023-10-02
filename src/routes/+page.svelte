<script lang="ts">
	import Card from '$lib/Card.svelte';
</script>

<main>
	<div class="prose">
		<h1>Bingo app demo</h1>
		<Card />
	</div>
</main>

<style>
	.prose :global(img) {
		margin: 0;
	}

	.prose {
		margin-inline: auto;
	}

	main {
		margin-top: 1rem;
	}
</style>
