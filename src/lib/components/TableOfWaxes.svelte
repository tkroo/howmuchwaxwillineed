<script lang="ts">
	import { s } from '$lib/sharedState.svelte';

	interface Props {
		waxes?: any[];
	}

	let { waxes = [] }: Props = $props();

	function getVisibleKeys(obj: any) {
		return Object.keys(obj).filter((key) => key !== 'id' && key !== 'createdAt');
	}

	function getVisibleEntries(obj: any) {
		return Object.entries(obj).filter(([key]) => key !== 'id' && key !== 'createdAt');
	}
</script>

{#if waxes.length > 0}
	<table>
		<thead>
			<tr>
				{#each getVisibleKeys(waxes[0]) as key}
					<th>{key}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each waxes as wax}
				<tr class:selected={wax.name === s.waxType.name}>
					{#each getVisibleEntries(wax) as [, value]}
						{#if value instanceof Object}
							<td>{value[s.tempUnit]}</td>
						{:else}
							<td>{value}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No waxes found</p>
{/if}

<style>
	.selected > td {
		background-color: #fecc63;
	}
</style>
