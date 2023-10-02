<script lang="ts">
	const entries: (number | undefined)[] = new Array(24).fill(undefined);

	let active: number | undefined = undefined;

	import Picker from './Picker.svelte';
	let picker: HTMLDialogElement;

	let selected: number | undefined = undefined;
	// https://www.svgrepo.com/svg/529148/question-circle

	$: if (selected !== undefined && active !== undefined) {
		const matchID = entries.indexOf(selected);
		if (matchID !== -1) {
			entries[matchID] = undefined;
		}
		entries[active] = selected;
		// TODO: update db
		selected = undefined;
		active = undefined;
		picker.close();
	}

	$: entryValid = entries.every((entry) => entry !== undefined);
</script>

<section class="bingo-wrapper">
	<div class="flex">
		<div class:entryValid class="p-2 mx-auto my-2 validity">
			{#if entryValid}
				Entry valid ✅
			{:else}
				Entry invalid ❌
			{/if}
		</div>
	</div>
	<div class="card">
		{#each entries as entry, i}
			<div class="item" class:undefined={entry === undefined} class:active={active === i}>
				<button
					on:click={() => {
						active = i;
						picker.showModal();
					}}
				>
					{#if entry === undefined}
						<svg viewBox="0 0 24 24" fill="none">
							<g stroke-width="0" /><g stroke-linecap="round" stroke-linejoin="round" />
							<g>
								<path
									d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
									stroke="#1C274C"
									stroke-width="1.5"
									stroke-linecap="round"
								/> <circle cx="12" cy="16" r="1" fill="#1C274C" />
								<path
									d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
									stroke="#1C274C"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							</g>
						</svg>
					{:else}
						{@const id = `${Math.floor(entry / 26) + 1}-${(entry % 26) + 1}`}
						<img src="/logos/{id}.png" alt="logo" />
					{/if}
				</button>
			</div>
		{/each}
		<div class="item center china">
			<img src="/logos/china.png" alt="China Buffet" />
		</div>
	</div>

	<dialog id="picker" class="modal" bind:this={picker}>
		<div class="modal-box">
			<Picker bind:selected {entries} />
		</div>
		<form method="dialog" class="modal-backdrop">
			<button
				on:click={() => {
					active = undefined;
					picker.close();
				}}
			>
				close
			</button>
		</form>
	</dialog>
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

	.item.undefined {
		background-color: #fbbd2380;
	}
	.item.active {
		border: 3px solid #36d399;
	}

	.item button {
		width: 100%;
		aspect-ratio: 1;
	}

	button img {
		--icon-size: 100%;
		max-width: var(--icon-size);
		max-height: var(--icon-size);
		aspect-ratio: 1;
		margin: auto;
	}

	.china {
		grid-area: 3 / 3 / 3 / 3;
		border: 3px solid #36d399;
	}

	.validity {
		background-color: #f8727280;
	}

	.validity.entryValid {
		background-color: #36d39980;
	}
</style>
