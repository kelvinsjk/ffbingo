<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// used in score page
	let correct: boolean | undefined = undefined;
	let selected: number | undefined = undefined;

	export let revealed: number[];
	export let guesses_attempted: number;
	export let nextAnswer: number | undefined = undefined;

	const all = Array.from(Array(40).keys());
	$: leftovers = all.filter((i) => !revealed.includes(i));

	let selectedID = '1-1';
	$: if (selected !== undefined) {
		selectedID = `${Math.floor(selected / 26) + 1}-${(selected % 26) + 1}`;
		if (selected === nextAnswer) {
			correct = true;
		} else {
			correct = false;
		}
		console.log('dispatch');
		window.setTimeout(() => {
			dispatch('guess', {
				correct
			});
			correct = undefined;
			selected = undefined;
		}, 750);
	}
</script>

<div class="grid justify-items-center prose text-center">
	<div
		class="grid max-w-xs"
		class:grid-cols-2={correct !== undefined}
	>
		<img src="/answers/{guesses_attempted + 1}a.png" alt="logo" />
		{#if correct !== undefined}
			<img src="/answers/{guesses_attempted + 1}b.png" alt="logo" />
		{/if}
	</div>
	<h2 class="mt-2">Where is this from?</h2>
	{#if correct}
		<div>
			<div use:confetti />
		</div>
	{/if}
</div>

<div class="picker">
	{#each leftovers as entry}
		{@const id = `${Math.floor(entry / 26) + 1}-${(entry % 26) + 1}`}
		<button
			class="item grid justify-items-center items-center"
			class:correct={correct !== undefined && entry === nextAnswer}
			class:wrong={correct === false && selected === entry}
			class:chosen={correct !== undefined}
			class:btn-disabled={correct !== undefined}
			on:click={() => {
				selected = all.indexOf(entry);
			}}
		>
			<img src="/logos/{id}.png" alt="logo" />
		</button>
	{/each}
</div>

<style>
	.picker {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--icon-size, 55px), 1fr));
		gap: 0.25rem;
	}
	.item {
		border: 1px solid blue;
	}
	.item,
	.item img {
		max-width: 100%;
		max-height: 100%;
		aspect-ratio: 1;
	}
	.item.chosen img {
		max-width: 75%;
		max-height: 75%;
	}
	.item.correct {
		border-color: #36d399;
		background-color: #36d399;
	}
	.item.wrong {
		border-color: #f56565;
		background-color: #f56565;
	}
</style>
