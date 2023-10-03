<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let entries = data.entries.map((entry) => entry ?? undefined);
	const { supabase, session } = data;

	$: updateEntries(entries);

	async function updateEntries(entries: (number | undefined)[]) {
		if (session?.user?.id) {
			const valid = entries.every((entry) => entry !== undefined) && entries.length === 24;
			const { data, error } = await supabase
				.from('bingo')
				.upsert({ entries, user_id: session.user.id, valid });
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
