<script lang="ts">
	import Score from '$lib/Score.svelte';
	import shuffle from 'lodash/shuffle';
	import InputGrid from '$lib/InputGrid.svelte';
	import type { PageData } from './$types';

	let picker: HTMLDialogElement;
	let selected: number | undefined = undefined;

	let leader: 0 | 1 | 2 = 0;
	let winner: 0 | 1 | 2 = 0;

	let score = 0;
	let cells = 0;
	let score2 = 0;
	let cells2 = 0;

	export let data: PageData;
	let entries = data.entries;
	let revealed = data.revealed;

	const all = Array.from(Array(40).keys());
	const entries2 = shuffle(all).slice(0, 24);

	$: updateRevealed(selected);

	async function updateRevealed(selected: number | undefined) {
		if (selected !== undefined) {
			revealed = [...revealed, selected];
			try {
				fetch('./api/updateRevealed', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ revealed })
				});
			} catch (error) {
				console.log('fetch error', error);
			}
			selected = undefined;
			picker.close();
		}
	}

	function updateLeader(cell1: number, cell2: number) {
		return cell1 > cell2 ? 1 : cell1 < cell2 ? 2 : 0;
	}

	$: leader = updateLeader(cells, cells2);

	function updateWinner(score1: number, score2: number) {
		if (winner === 0) {
			return score1 > score2 ? 1 : score1 < score2 ? 2 : 0;
		} else {
			return winner;
		}
	}

	$: winner = updateWinner(score, score2);
</script>

<svelte:head>
	<title>USA Trip Bingo</title>
</svelte:head>

<main>
	<div class="prose max-w-none">
		<h1>Bingo app demo</h1>
		<div class="grid cards">
			<div class="prose grid">
				<div class="indicator justify-self-center">
					<h2 class="text-center mt-0">Your card</h2>
					{#if leader === 1 && winner === 0}
						<span class="indicator-item badge badge-secondary"> 🏃‍♀️ </span>
					{:else if winner === 1}
						<span class="indicator-item badge badge-primary"> 👑 </span>
					{/if}
				</div>
				<Score {entries} {revealed} bind:score bind:cells />
			</div>
			<div class="grid place-items-center">
				<button
					class="btn btn-primary"
					on:click={() => {
						picker.showModal();
					}}>Input</button
				>
			</div>
			<div class="prose grid">
				<div class="indicator justify-self-center">
					<h2 class="text-center mt-0">X's card</h2>
					{#if leader === 2 && winner === 0}
						<span class="indicator-item badge badge-secondary"> 🏃‍♂️ </span>
					{:else if winner === 2}
						<span class="indicator-item badge badge-primary"> 👑 </span>
					{/if}
				</div>
				<Score entries={entries2} {revealed} bind:score={score2} bind:cells={cells2} />
			</div>
		</div>
		<div class="prose mt-4 player-card">
			<Score {entries} {revealed} />
		</div>
	</div>
</main>

<dialog id="picker" class="modal" bind:this={picker}>
	<div class="modal-box">
		<InputGrid bind:selected {revealed} />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button> close </button>
	</form>
</dialog>

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

	.badge-primary,
	.badge-secondary {
		--tw-bg-opacity: 0.5;
	}
</style>
