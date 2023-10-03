<script lang="ts">
	// used in score page
	export let selected: number | undefined = undefined;
	export let revealed: number[];

	const all = Array.from(Array(40).keys());
	$: leftovers = all.filter((i) => !revealed.includes(i));
</script>

<div class="picker">
	{#each leftovers as entry}
		{@const id = `${Math.floor(entry / 26) + 1}-${(entry % 26) + 1}`}
		<button
			class="item"
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
		border: 1px solid #36d399;
	}
	.item,
	.item img {
		max-width: 100%;
		max-height: 100%;
		aspect-ratio: 1;
	}
</style>
