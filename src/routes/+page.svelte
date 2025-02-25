<script lang="ts">
  import { waxes } from '$lib/containersAndWaxes';
  import { s, TotalWaxNeeded } from '$lib/sharedState.svelte';
	import Table from '$lib/components/Table.svelte';

  let tempScale = $state('F');

  let groupNamesList = $derived.by(() => s.groups.map((containerGroup) => ('<strong>'+containerGroup.quantity+'</strong> ' + ' ' + containerGroup.type.name + (containerGroup.quantity > 1 ? 's' : ''))));

  function joinWithAnd(arr: string[]) {
    if (arr.length <= 1) {
      return arr.join('');
    }
    const allButLast = arr.slice(0, -1).join(', ');
    const last = arr.slice(-1);
    return `${allButLast}, and ${last}`;
  }

</script>

{#snippet Notes(w: any)}
  <div class="notes">
    <p>Heat <strong>{w.name}</strong> to <strong>{w.addFragranceTemperature[tempScale]}</strong>, add fragrance (and liquid dye), remove from heat, and stir for 2 minutes.</p>
    <p>Let the wax cool to <strong>{w.pourTemperature[tempScale]}</strong>, then pour into containers.</p>
    <p>Allow candles to cure for {w.cureTime}.</p>
</div>
{/snippet}

{#snippet WaxInfo(w: any)}
  <div class="notes">
    <p><strong>{w.name}</strong></p>
    <p>Add frangrance temperature: {w.addFragranceTemperature[tempScale]}</p>
    <p>Pour temperature: {w.pourTemperature[tempScale]}</p>
    <p>Melt point: {w.meltPoint[tempScale]}</p>
    <p>Specific gravity: {w.specificGravity}</p>
    <p>Max fragrance load: {w.maxFrangranceLoad}</p>
    <p>Cure time: {w.cureTime}</p>
  </div>
{/snippet}
<form>
    <div class="myrow">
      <div class="mycol">
        <label for="waxType">Wax type
          <select bind:value={s.waxType} name="waxType" id="waxType">
            {#each waxes as wax}
            <option value={wax}>{wax.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="mycol">
        <label for="tempScale">Temp Scale
          <select bind:value={tempScale} name="tempScale" id="tempScale">
            <option value="F">Fahrenheit</option>
            <option value="C">Celsius</option>
          </select>
        </label>
      </div>
    </div>  
</form>

<section>
  <article>
    <header>Containers</header>
    <Table />
  </article>
  {#if s.groups.length>0}
    <article class="highlight">
      <p><strong>How much wax will I need?</strong></p>
      <p class="result">You'll need <strong>{TotalWaxNeeded()} grams</strong> of <strong>{s.waxType.name}</strong> to fill<br>{@html joinWithAnd(groupNamesList)}.</p>
    </article>
  {/if}
</section>

<article>
  <header>Instructions</header>
  {@render Notes(s.waxType)}
</article>

<article>
  <header>Info</header>
  {@render WaxInfo(s.waxType)}
</article>


  

<style>
  .myrow {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .result {
    font-size: 1.5rem;
  }

  .highlight {
    background-color: #fecc63;
  }
</style>