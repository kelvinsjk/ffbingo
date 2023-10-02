<script lang="ts">
	// flip transition

	import Qn from '$lib/Qn.svelte';
	export let entries: number[] = Array.from(Array(24).keys());
	export let revealed = [0, 1, 2, 3, 4, 5, 26, 7, 16, 21, 6, 17, 23, 8, 15, 19];

	const rows = [0, 5, 10, 14, 19].reduce((acc, rowStart) => {
		const rowHit = entries
			.slice(rowStart, rowStart + (rowStart === 10 ? 4 : 5))
			.every((entry) => revealed.includes(entry));
		return acc + Number(rowHit);
	}, 0);
	const columns = [0, 1, 2, 3, 4].reduce((acc, colStart) => {
		const col =
			colStart === 2
				? [entries[colStart], entries[colStart + 5], entries[colStart + 14], entries[colStart + 19]]
				: [
						entries[colStart],
						entries[colStart + 5],
						entries[colStart + 10],
						entries[colStart + 14],
						entries[colStart + 19]
				  ];
		const colHit = col.every((entry) => revealed.includes(entry));
		return acc + Number(colHit);
	}, 0);
	const diag1 = Number([0, 6, 17, 23].every((entry) => revealed.includes(entries[entry])));
	const diag2 = Number([4, 8, 15, 19].every((entry) => revealed.includes(entries[entry])));
	const score = rows + columns + diag1 + diag2;
	const cells = entries.reduce((acc, entry) => acc + Number(revealed.includes(entry)), 0);
</script>

<section class="scorecard-wrapper">
	<div class="card">
		{#each entries as entry, i}
			{@const correct = revealed.includes(entry)}
			<div class="item" class:correct>
				{#if correct}
					{@const id = `${Math.floor(entry / 26) + 1}-${(entry % 26) + 1}`}
					<img src="/logos/{id}.png" alt="logo" />
				{:else}
					<Qn />
				{/if}
			</div>
		{/each}
		<div class="item center china">
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
		background-color: #fbbd2380;
	}

	.item.correct {
		border: 3px solid #36d399;
	}

	.item :global(*) {
		width: 100%;
		aspect-ratio: 1;
	}

	.china {
		grid-area: 3 / 3 / 3 / 3;
		border: 3px solid #36d399;
	}

	.scorecard-wrapper {
		display: grid;
		place-items: center;
		gap: 1em;
	}

	.score-container {
		justify-content: center;
	}
</style>
