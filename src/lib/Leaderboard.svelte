<script lang="ts">
	interface Entry {
		user_id: string;
		entry: number[];
		guesses_correct: number;
		guesses_attempted: number;
		score?: number;
		line?: number;
	}
	export let entry: Entry[];
	export let revealed: number[];
	let scores: Entry[];
	function updateScores(entry: Entry[]): Entry[] {
		return entry.map((e) => {
			const [lines, cells] = score(e.entry, revealed);
			return {
				...e,
				score: lines,
				line: cells,
			};
		});
	}
	$: scores = updateScores(entry);

	function score(entry: number[], revealed: number[]): [number, number] {
		const r1 = [0, 1, 2, 3, 4].every((e) => revealed.includes(entry[e]));
		const r2 = [5, 6, 7, 8, 9].every((e) => revealed.includes(entry[e]));
		const r3 = [10, 11, 12, 13].every((e) => revealed.includes(entry[e]));
		const r4 = [14, 15, 16, 17, 18].every((e) => revealed.includes(entry[e]));
		const r5 = [19, 20, 21, 22, 23].every((e) => revealed.includes(entry[e]));
		const c1 = [0, 5, 10, 14, 19].every((e) => revealed.includes(entry[e]));
		const c2 = [1, 6, 11, 15, 20].every((e) => revealed.includes(entry[e]));
		const c3 = [2, 7, 16, 21].every((e) => revealed.includes(entry[e]));
		const c4 = [3, 8, 12, 17, 22].every((e) => revealed.includes(entry[e]));
		const c5 = [4, 9, 13, 18, 23].every((e) => revealed.includes(entry[e]));
		const d1 = [0, 6, 17, 23].every((e) => revealed.includes(entry[e]));
		const d2 = [4, 8, 15, 19].every((e) => revealed.includes(entry[e]));
		const lines = [r1, r2, r3, r4, r5, c1, c2, c3, c4, c5, d1, d2].reduce(
			(acc, row) => acc + Number(row),
			0,
		);
		const cells = entry.reduce((acc, entry) => acc + Number(revealed.includes(entry)), 0);
		return [lines, cells];
	}

	const ids: { [key: string]: string } = {
		'c6325958-199e-4c17-b5cf-049fa3207a8e': 'H',
		'36dfc698-b4de-4ab8-9ed9-156475c87971': 'R',
		'9eb3754b-5e80-419c-a9ce-907e87a7ef85': 'S',
	};
</script>

<div class="prose">
	<h2>Leaderboard</h2>
	<div class="grid prose">
		<div />
		<div class="text-center heading">H</div>
		<div class="text-center heading">R</div>
		<div class="text-center heading">S</div>
		<div class="heading">Cells</div>
		{#each scores.filter((e) => e.user_id !== '05404d08-6428-4ef5-9173-1c21a4a9cdf8') as entry}
			<div class="text-center">
				{entry.score}
			</div>
		{/each}
		<div class="heading">Lines</div>
		{#each scores.filter((e) => e.user_id !== '05404d08-6428-4ef5-9173-1c21a4a9cdf8') as entry}
			<div class="text-center">
				{entry.line}
			</div>
		{/each}
		<div class="heading">Guesses</div>
		{#each scores.filter((e) => e.user_id !== '05404d08-6428-4ef5-9173-1c21a4a9cdf8') as entry}
			<div class="text-center">
				{entry.guesses_attempted} / {entry.guesses_correct}
			</div>
		{/each}
	</div>
	<div class="mt-4 p-4 winner text-xl">👑 First to line 1: &mdash;</div>
</div>

<style>
	.prose {
		margin-inline: auto;
	}
	.grid {
		padding-inline: 1rem;
		grid-template-columns: 8.5ch 1fr 1fr 1fr;
	}
	.grid > div:not(:first-child) {
		border: 1px solid #ccc;
	}
	.heading {
		background-color: #eee;
		font-weight: bold;
	}
	.winner {
		background-color: #3abff8;
		font-weight: bold;
		letter-spacing: 1px;
	}
</style>
