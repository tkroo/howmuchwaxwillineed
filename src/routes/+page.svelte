<script lang="ts">
  import { waxes, TempScales } from '$lib/appConstants';
  import { s, TotalWaxNeeded } from '$lib/sharedState.svelte';
  // import { WaxInfo, Notes } from '$lib/snippets.svelte';
	import Table from '$lib/components/Table.svelte';

  let groupNamesList = $derived.by(() => s.groups.map((group) => ('<strong>'+group.quantity+'</strong> ' + ' ' + group.type.name + (group.quantity > 1 ? 's' : ''))));

  function joinWithAnd(arr: string[]) {
    if (arr.length <= 1) {
      return arr.join('');
    }
    const allButLast = arr.slice(0, -1).join(', ');
    const last = arr.slice(-1);
    return `${allButLast}, and ${last}`;
  }

</script>

<form>
    <div class="myrow">
      <div class="mycol">
        <label for="waxType">Type of wax
          <select bind:value={s.waxType} name="waxType" id="waxType">
            {#each waxes as wax}
            <option value={wax}>{wax.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="mycol">
        <label for="tempScale">Temperature scale
          <select bind:value={s.tempUnit} name="tempScale" id="tempScale">
            {#each TempScales as tempScale}
              <option value={tempScale.value}>{tempScale.name}</option>
            {/each}
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
      <p class="result-header"><strong>How much wax will I need?</strong></p>
      <p class="result">You'll need <strong>{TotalWaxNeeded()} grams</strong> of <strong>{s.waxType.name}</strong> to fill {@html joinWithAnd(groupNamesList)}.</p>
    </article>
  {/if}
</section>

<article>
  <header>Instructions</header>
  <div class="notes">
    <p>Heat <strong>{s.waxType.name}</strong> to <strong>{s.waxType.addFragranceTemperature[s.tempUnit]}</strong>, add fragrance (and liquid dye), remove from heat, and stir for 2 minutes.</p>
    <p>Let the wax cool to <strong>{s.waxType.pourTemperature[s.tempUnit]}</strong>, then pour into containers.</p>
    <p>Allow candles to cure for {s.waxType.cureTime}.</p>
  </div>
</article>

<article>
  <header>Info</header>
  <div class="notes">
    <p><strong>{s.waxType.name}</strong></p>
    <p>Add frangrance temperature: {s.waxType.addFragranceTemperature[s.tempUnit]}</p>
    <p>Pour temperature: {s.waxType.pourTemperature[s.tempUnit]}</p>
    <p>Melt point: {s.waxType.meltPoint[s.tempUnit]}</p>
    <p>Specific gravity: {s.waxType.specificGravity}</p>
    <p>Max fragrance load: {s.waxType.maxFrangranceLoad}</p>
    <p>Cure time: {s.waxType.cureTime}</p>
  </div>
</article>


  

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

</style>