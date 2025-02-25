<script lang="ts">
  import { containers } from '$lib/appConstants';
  import { s } from '$lib/sharedState.svelte';
  let { row=$bindable() } = $props();

  function removeRow(id: string) {
    s.groups = s.groups.filter(x => x.id != id)
  }

</script>

<tr>
  <td><input type="number" name="q" bind:value={row.quantity} autocomplete="off" min="1" size="2"></td>
  <!-- <td>{row.type.name}</td> -->
  <td>
    <select bind:value={row.type} name="containerType" id="containerType">
      {#each containers as container}
      <option value={container}>{container.name}</option>
      {/each}
    </select>
  </td>
  <td>{(row.type.waterGrams * row.quantity) * s.waxType.specificGravity} grams</td>
  <td style="text-align: right;"><button title="remove" class="remove-button" onclick={() => {removeRow(row.id)}}>x</button></td>
</tr>


<style>
  .remove-button, input[type='number'] {
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