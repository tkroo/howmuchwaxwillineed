<script>
  import { s } from '$lib/sharedState.svelte';
  import { waxes } from '$lib/appConstants';
</script>

<table>
  <thead>
    <tr>
      {#each Object.keys(waxes[0]) as key}
        <th>{key}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each waxes as wax}
      <tr class:selected={wax.name === s.waxType.name}>
        {#each Object.values(wax) as value}
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

<style>
  .selected > td {
    background-color: #fecc63;
  }
</style>