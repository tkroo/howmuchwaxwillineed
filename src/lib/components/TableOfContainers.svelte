<script lang="ts">
	interface Props {
		containers?: any[];
	}

	let { containers = [] }: Props = $props();

	function getVisibleKeys(obj: any) {
		return Object.keys(obj).filter((key) => key !== 'id' && key !== 'createdAt');
	}

	function getVisibleValues(obj: any) {
		return Object.entries(obj)
			.filter(([key]) => key !== 'id' && key !== 'createdAt')
			.map(([, value]) => value);
	}
</script>

{#if containers.length > 0}
	<table>
		<thead>
			<tr>
				{#each getVisibleKeys(containers[0]) as key}
					<th>{key}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each containers as container}
				<tr>
					{#each getVisibleValues(container) as value}
						<td>{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No containers found</p>
{/if}

<!-- <table>
  <thead>
    <tr>
      <th>Wax Type</th>
      <th>Pour Temp</th>
      <th>Add Fragance Temp</th>
      <th>Melt Point</th>
      <th>Specific Gravity</th>
      <th>Max Fragrance Load</th>
      <th>Cure Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{s.waxType.name}</td>
      <td>{s.waxType.pourTemperature[s.tempUnit]}</td>
      <td>{s.waxType.addFragranceTemperature[s.tempUnit]}</td>
      <td>{s.waxType.meltPoint[s.tempUnit]}</td>
      <td>{s.waxType.specificGravity}</td>
      <td>{s.waxType.maxFrangranceLoad}</td>
      <td>{s.waxType.cureTime}</td>
    </tr>

  </tbody>
</table> -->
