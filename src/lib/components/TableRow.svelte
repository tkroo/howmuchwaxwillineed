<script>
  let { containers, containerGroups=$bindable(), containerGroup=$bindable(), sg, i } = $props();

</script>

<tr>
  <td><input type="number" name="q" bind:value={containerGroup.quantity} autocomplete="off" min="1" size="2"></td>
  <!-- <td>{containerGroup.type.name}</td> -->
  <td>
    <select bind:value={containerGroup.type} name="containerType" id="containerType">
      {#each containers as container}
      <option value={container}>{container.name}</option>
      {/each}
    </select>
  </td>
  <td>{(containerGroup.type.waterGrams * containerGroup.quantity) * sg} grams</td>
  <td><button class="remove-button" onclick={() => containerGroups.splice(i, 1)}>x</button></td>
</tr>


<style>
  .remove-button, input[type='number'] {
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
</style>