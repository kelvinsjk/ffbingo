<script lang="ts">
	import Score from '$lib/Score.svelte';
	import GuessGrid from '$lib/GuessGrid.svelte';
	import type { PageData } from './$types';

	let picker: HTMLDialogElement;

	export let data: PageData;
	const { user, entry, others, supabase } = data;
	let { guesses_attempted, guesses_correct } = data;

	const ids: { [key: string]: string } = {
		'c6325958-199e-4c17-b5cf-049fa3207a8e': 'H',
		'36dfc698-b4de-4ab8-9ed9-156475c87971': 'R',
		'9eb3754b-5e80-419c-a9ce-907e87a7ef85': 'S',
	};

	import { answers } from '$lib/answers';
	import Leaderboard from '$lib/Leaderboard.svelte';

	let revealed = answers![guesses_attempted].revealed;
	let nextAnswer = answers![guesses_attempted + 1]?.latest;

	const stage = answers!.length - 1;

	async function handleGuess(event: CustomEvent<{ correct: boolean }>) {
		picker.close();
		window.setTimeout(async () => {
			guesses_attempted += 1;
			revealed = answers![guesses_attempted]?.revealed;
			nextAnswer = answers![guesses_attempted + 1]?.latest;
			if (event.detail.correct) {
				guesses_correct += 1;
			}
			await supabase
				.from('bingo')
				.update({ guesses_attempted, guesses_correct })
				.eq('user_id', user);
		}, 750);
		// api call
	}
</script>

<svelte:head>
	<title>USA Trip Bingo</title>
</svelte:head>

<main>
	<div class="prose max-w-none text-center">
		<h1 class="mx-2">USA Chains Bingo</h1>
		{#if stage > guesses_attempted}
			<!--Guess-->
			<div class="grid justify-items-center">
				<div class="alert alert-info max-w-prose">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current shrink-0 w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>{stage - guesses_attempted} new cards to be revealed.</span>
					<div class="grid gap-2">
						<button
							class="btn"
							on:click={() => {
								picker.showModal();
							}}>Guess the chains</button
						>
					</div>
				</div>
			</div>
		{:else}
			<!--Leader board-->
			<Leaderboard
				{revealed}
				entry={[...others, { user_id: user, entry, guesses_attempted, guesses_correct }]}
			/>
		{/if}
		<!-- Entries -->
		<div class="prose mt-4 player-card">
			<h2>Your entry</h2>
			<Score {entry} {revealed} />
		</div>
		<div class="grid grid-cols-2 gap-2">
			{#each others as other}
				{@const entryO = other.entry}
				{@const id = other.user_id}
				<div class="prose mt-4 player-card text-center">
					<h2>
						{ids[id]}'s entry
					</h2>
					<Score entry={entryO} {revealed} />
				</div>
			{/each}
		</div>
	</div>
</main>

<dialog id="picker" class="modal" bind:this={picker}>
	<div class="modal-box">
		<GuessGrid on:guess={handleGuess} {revealed} {guesses_attempted} {nextAnswer} />
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
</style>
