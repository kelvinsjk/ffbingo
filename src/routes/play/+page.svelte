<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let entries = data.entry.map((e) => e ?? undefined);
	const { supabase, session } = data;

	$: updateEntries(entries);

	async function updateEntries(entry: (number | undefined)[]) {
		if (session?.user?.id) {
			const valid = entry.every((e) => e !== undefined) && entry.length === 24;
			const { data, error } = await supabase
				.from('bingo')
				.update({ entry, valid })
				.eq('user_id', session.user.id);
			console.log(error);
		}
	}
</script>

<svelte:head>
	<title>USA Trip Bingo</title>
</svelte:head>

<main>
	<div class="prose">
		<h1>Bingo app demo</h1>
		<Card bind:entries />
	</div>
</main>

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
