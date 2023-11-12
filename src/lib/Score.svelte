<script lang="ts">
	// used in score page

	import Qn from '$lib/Qn.svelte';
	export let entry: number[] = Array.from(Array(24).keys());
	export let revealed = [0, 1, 2, 3, 4, 5, 26, 7, 16, 21, 6, 17, 23, 8, 15, 19];

	export let score: number = 0;
	export let cells: number = 0;
	let rowInfo: boolean[]; // [r1, r2, r3, r4, r5, c1, c2, c3, c4, c5, d1, d2]
	const rowCheck = [
		[0, 5, 10],
		[0, 6],
		[0, 7],
		[0, 8],
		[0, 9, 11],
		[1, 5],
		[1, 6, 10],
		[1, 7],
		[1, 8, 11],
		[1, 9],
		[2, 5],
		[2, 6],
		[2, 8],
		[2, 9],
		[3, 5],
		[3, 6, 11],
		[3, 7],
		[3, 8, 10],
		[3, 9],
		[4, 5, 11],
		[4, 6],
		[4, 7],
		[4, 8],
		[4, 9, 10]
	];
	$: [score, cells, rowInfo] = updateScore(revealed);

	function updateScore(revealed: number[]): [number, number, boolean[]] {
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
		const score = [r1, r2, r3, r4, r5, c1, c2, c3, c4, c5, d1, d2].reduce(
			(acc, row) => acc + Number(row),
			0
		);
		const cells = entry.reduce((acc, entry) => acc + Number(revealed.includes(entry)), 0);
		return [score, cells, [r1, r2, r3, r4, r5, c1, c2, c3, c4, c5, d1, d2]];
	}
</script>

<section class="scorecard-wrapper">
	<div class="card">
		{#each entry as entry, i}
			{@const correct = revealed.includes(entry)}
			{@const id = `${Math.floor(entry / 26) + 1}-${(entry % 26) + 1}`}
			<div class="item swap swap-flip" class:swap-active={correct}>
				<div class="swap-on" class:win={rowCheck[i].some((id) => rowInfo[id])}>
					<img src="/logos/{id}.png" alt="logo" />
				</div>
				<div class="swap-off">
					<Qn />
				</div>
			</div>
		{/each}
		<div
			class="item center china"
			class:win={rowInfo[2] || rowInfo[7] || rowInfo[10] || rowInfo[11]}
		>
			<img src="/logos/china.png" alt="China Buffet" />
		</div>
	</div>
	<div class="flex gap-x-4 flex-wrap score-container">
		<div>
			Cells: {cells}
		</div>
		<div>
			Lines: {score}
		</div>
	</div>
</section>

<style>
	.card {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 1px;
	}

	.item {
		aspect-ratio: 1;
		border: 1px solid #ccc;
		display: grid;
		place-items: center;
	}

	.swap-on {
		border: 3px solid #36d399;
	}
	.swap-on.win {
		border-color: red;
	}

	.swap-off {
		background-color: #fbbd2380;
	}

	.item :global(*) {
		width: 100%;
		aspect-ratio: 1;
	}

	.china {
		grid-area: 3 / 3 / 3 / 3;
		border: 3px solid #36d399;
	}
	.china.win {
		border-color: red;
	}

	.scorecard-wrapper {
		display: grid;
		place-items: center;
		gap: 1em;
	}

	.score-container {
		justify-content: center;
	}

	.swap {
		cursor: default;
	}
</style>
