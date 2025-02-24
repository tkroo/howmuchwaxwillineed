<script lang="ts">
	import TableRow from "./TableRow.svelte";

  let { containerGroups=$bindable(), groupsTotalWaxGrams, waxType} = $props();
</script>

<table>
  <thead>
    <tr>
      <th>Quantity</th>
      <th>Container Type</th>
      <th>Wax</th>
      <th>remove</th>
    </tr>
  </thead>
  <tbody>
    {#each containerGroups as containerGroup, i (i)}
      <TableRow {containerGroups} {containerGroup} sg={waxType.specificGravity} i={i} />
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <th></th>
      <th>{groupsTotalWaxGrams} grams</th>
    </tr>
  </tfoot>
</table>