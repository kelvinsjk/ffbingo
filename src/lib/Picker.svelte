<script lang="ts">
	// used in card component

	import { items } from './index';

	export let selected: number | undefined = undefined;
	export let entries: (number | undefined)[];
</script>

<div class="picker">
	{#each Object.entries(items) as [id, name], i}
		<button
			class="item"
			class:picked={entries.includes(i)}
			on:click={() => {
				selected = i;
			}}
		>
			<img src={`/logos/${id}.png`} alt={name} />
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
	.item.picked {
		border: 3px solid #f87272;
	}
</style>
