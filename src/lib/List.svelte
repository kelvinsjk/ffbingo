<script lang="ts">
	// used in restaurant page
	import { items } from './index';

	export let revealed: number[];
	export let complement = false;

	const indices = Array.from(Array(40).keys());
	if (complement) {
		revealed = indices.filter((i) => !revealed.includes(i));
	}

	const all = Object.entries(items);
	const entries = revealed.map((i) => all[i]);
</script>

<div class="picker">
	{#each revealed as entry}
		{@const id = `${Math.floor(entry / 26) + 1}-${(entry % 26) + 1}`}
		<div class="item grid place-items-center">
			<img src="/logos/{id}.png" alt="logo" />
		</div>
	{/each}
</div>

<style>
	.picker {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--icon-size, 55px), 1fr));
		gap: 0.25rem;
		row-gap: 0.5rem;
	}
	.item,
	.item img {
		max-width: 100%;
		max-height: 100%;
		aspect-ratio: 1;
	}
</style>
