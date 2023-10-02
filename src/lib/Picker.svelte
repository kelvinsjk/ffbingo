<script lang="ts">
	import { items } from './index';
</script>

<div class="picker">
	{#each Object.entries(items) as [id, name]}
		<button class="item" on:click={() => {}}>
			<img src={`/logos/${id}.png`} alt={name} />
			<span>{name}</span>
		</button>
	{/each}
</div>

<style>
	.picker {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 1rem;
	}
</style>
