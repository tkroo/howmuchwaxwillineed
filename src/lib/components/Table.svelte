<script lang="ts">
	import TableRow from "./TableRow.svelte";

  let { containerGroups=$bindable(), containers, groupsTotalWaxGrams, waxType, numberOfContainers=$bindable(), containerType=$bindable() } = $props();
</script>

<table>
  <thead>
    <tr class="add-row">
      <td>
        <input type="number" name="numberOfContainers" id="numberOfContainers" size="2" bind:value={numberOfContainers}>
      </td>
      <td>
        <select bind:value={containerType} name="containerType" id="containerType">
          {#each containers as container}
          <option value={container}>{container.name}</option>
          {/each}
        </select>
      </td>
      <td></td>
      <td>
        <button type="button" class="add-button" onclick={() => containerGroups.push({type:containerType, quantity:numberOfContainers})}>Add new</button>
      </td>
    </tr>
    <tr>
      <th>Quantity</th>
      <th>Container Type</th>
      <th>Wax</th>
      <th style="text-align: center;">action</th>
    </tr>
  </thead>
  <tbody>
    
    
    {#each containerGroups as containerGroup, i (i)}
      <TableRow {containers} {containerGroups} {containerGroup} sg={waxType.specificGravity} i={i} />
    {/each}
    
  </tbody>
  {#if containerGroups.length > 0}
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <th></th>
      <th>{groupsTotalWaxGrams} grams</th>
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
    width: fit-content;
    --pico-form-element-spacing-vertical: 0.2rem;
  }
  select {
    --pico-form-element-spacing-vertical: 0.2rem;
  }
  thead th {
    /* background-color: #ccc; */
  }
</style>