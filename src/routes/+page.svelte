<script lang="ts">
	import { s, TotalWaxNeeded } from '$lib/sharedState.svelte';
	// import { WaxInfo, Notes } from '$lib/snippets.svelte';
	import Table from '$lib/components/Table.svelte';
	import TableOfWaxes from '$lib/components/TableOfWaxes.svelte';
	import TableOfContainers from '$lib/components/TableOfContainers.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let waxes = $state(data.waxes);
	let containers = $state(data.containers);

	// Initialize shared state with database data and defaults
	if (waxes.length > 0 && !s.waxType.id) {
		const defaultWax =
			data.defaultWaxId && waxes.find((w) => w.id === data.defaultWaxId)
				? waxes.find((w) => w.id === data.defaultWaxId)
				: waxes[0];
		s.waxType = defaultWax!;
	}

	// Set default temperature unit
	if (data.defaultTempUnit) {
		s.tempUnit = data.defaultTempUnit;
	}

	if (containers.length > 0) {
		// This will be used by the Table component for default container selection
	}

	let groupNamesList = $derived.by(() =>
		s.groups.map(
			(group) =>
				'<strong>' +
				group.quantity +
				'</strong> ' +
				' ' +
				group.type.name +
				(group.quantity > 1 ? 's' : '')
		)
	);

	function joinWithAnd(arr: string[]) {
		if (arr.length <= 1) {
			return arr.join('');
		}
		const allButLast = arr.slice(0, -1).join(', ');
		const last = arr.slice(-1);
		return `${allButLast}, and ${last}`;
	}
</script>

<section>
	<form>
		<div class="myrow">
			<div class="mycol">
				<label for="waxType"
					>Type of wax
					<select bind:value={s.waxType} name="waxType" id="waxType">
						{#each waxes as wax}
							<option value={wax}>{wax.name}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>
	</form>

	<article>
		<header>Containers</header>
		<Table {containers} defaultContainerId={data.defaultContainerId} />
	</article>

	{#if s.groups.length > 0}
		<article class="highlight">
			<p class="result-header"><strong>How much wax will I need?</strong></p>
			<p class="result">
				You'll need <strong>{TotalWaxNeeded()} grams</strong> of <strong>{s.waxType.name}</strong>
				to fill {@html joinWithAnd(groupNamesList)}.
			</p>
		</article>
	{/if}
</section>

<section>
	<article class="instructions">
		<header>Instructions</header>
		<div class="notes">
			<p>
				Heat <strong>{s.waxType.name}</strong> to
				<strong>{s.waxType.addFragranceTemperature[s.tempUnit]}</strong>, add fragrance (and liquid
				dye), remove from heat, and stir for 2 minutes.
			</p>
			<p>
				Let the wax cool to <strong>{s.waxType.pourTemperature[s.tempUnit]}</strong>, then pour into
				containers.
			</p>
			<p>Allow candles to cure for {s.waxType.cureTime}.</p>
		</div>
	</article>
</section>

<section class="moreinfo">
	<h2>more info</h2>
	<article>
		<header>Waxes</header>
		<TableOfWaxes {waxes} />
	</article>
	<article>
		<header>Containers</header>
		<TableOfContainers {containers} />
	</article>
</section>

<style>
	.myrow {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.highlight {
		background-color: #fecc63;
	}

	.result-header {
		font-size: 1.5rem;
		padding: 1rem 1rem 0 1rem;
	}

	.result {
		font-size: 1.5rem;
		padding: 0rem 1rem 1rem 1rem;
	}

	.moreinfo {
		margin-top: 2rem;
	}

	.instructions {
		font-size: 1.5rem;
	}
</style>
