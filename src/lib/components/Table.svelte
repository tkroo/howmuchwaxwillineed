<script lang="ts">
  import { nanoid } from 'nanoid';
  import { containers } from '$lib/appConstants';
  import { s, TotalWaxNeeded } from '$lib/sharedState.svelte';
	import TableRow from "./TableRow.svelte";
  let numberOfContainers = $state(1);
  let numberOfCustomContainers = $state(1);
  let containerType = $state(containers[0]);
  let customWaterGrams = $state(0);
  let customName = $state("custom");
  let localContainers = $state(containers);

</script>

<table>
  <thead>
    <tr class="add-row">
      <td>
        <fieldset>
          <label for="numberOfContainers"></label>
          <input type="number" bind:value={numberOfContainers} name="numberOfContainers" id="numberOfContainers">
        </fieldset>
      </td>
      <td>
        <select bind:value={containerType} name="containerType" id="containerType">
          {#each localContainers as container}
          <option value={container}>{container.name}</option>
          {/each}
        </select>
      </td>
      <td>
        <button type="button" class="add-button" onclick={() => s.groups.push({type:containerType, quantity:numberOfContainers, id: nanoid()})}>Add new</button>
      </td>
    </tr>
    <tr class="add-row">
      <td>
        <fieldset>
          <label for="numberOfCustomContainers"></label>
          <input type="number" bind:value={numberOfCustomContainers} name="numberOfCustomContainers" id="numberOfCustomContainers">
        </fieldset>
      </td>
      <td>
        <fieldset>
          <label for="customName">Name</label>
          <input type="text" bind:value={customName} name="customName" id="customName">
        </fieldset>
        <fieldset>
          <label for="waterGrams">custom container (enter water weight in grams)</label>
          <input type="number" bind:value={customWaterGrams} name="waterGrams" id="waterGrams" style="width: 6rem;">
        </fieldset>
      </td>
      <td>
        <button type="button" class="add-button" onclick={() => {
          let name = `custom ${customWaterGrams}g`;
          localContainers.push({name: customName, waterGrams: customWaterGrams, diameter: 0, wicks: ['?']})
          s.groups.push({type:{name: name, waterGrams: customWaterGrams}, quantity:numberOfCustomContainers, id: nanoid()})
        }}>Add custom</button>
      </td>
    </tr>
    <tr>
      <th>Quantity</th>
      <th>Container Type</th>
      <th>Wax</th>
      <th style="text-align: right;">action</th>
    </tr>
  </thead>
  <tbody>
    
    
    {#each s.groups as row, i (row.id)}
      <TableRow {row} containers={localContainers} />
    {/each}
    
  </tbody>
  {#if s.groups.length > 0}
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <th></th>
      <th>{TotalWaxNeeded()} grams</th>
    </tr>
  </tfoot>
  {/if}
</table>

<style>
  .add-row {
    border-bottom: 3px solid #333;
  }
  .add-row td {
    /* background-color: #979797; */
    --pico-spacing: 0;
    padding: 0.5rem 1rem;
  }
  .add-button, input[type='number'] {
    --pico-form-element-spacing-vertical: 0rem;
    --pico-form-element-spacing-horizontal: 0.5rem;
  }
  input[type='number'] {
    width: 4rem;
    --pico-form-element-spacing-vertical: 0.2rem;
  }
  select {
    --pico-form-element-spacing-vertical: 0.2rem;
  }
</style>