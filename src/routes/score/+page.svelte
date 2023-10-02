<script lang="ts">
	import Score from '$lib/Score.svelte';
</script>

<svelte:head>
	<title>USA Trip Bingo</title>
</svelte:head>

<main>
	<div class="prose max-w-none">
		<h1>Bingo app demo</h1>
		<div class="grid cards">
			<div class="prose">
				<h2 class="text-center">Your card</h2>
				<Score />
			</div>
			<div class="grid place-items-center">
				<button class="btn btn-primary">Input</button>
			</div>
			<div class="prose">
				<h2 class="text-center">X's card</h2>
				<Score />
			</div>
		</div>
		<div class="prose mt-4 player-card">
			<Score />
		</div>
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

	.cards {
		display: grid;
		grid-template-columns: calc(50% - 40px - 0.5rem) 80px calc(50% - 40px - 0.5rem);
		gap: 0.5rem;
	}

	@media (min-width: 768px) {
		.player-card {
			display: none;
		}
	}
</style>
