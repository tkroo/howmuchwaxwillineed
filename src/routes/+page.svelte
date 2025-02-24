<script>
	import Table from '$lib/components/Table.svelte';

  const containers = [
    {
      name: 'Bonne Mamam 13oz jar',
      waterGrams: 240,
      diameter: 2.75,
      wicks: ['LX 16']
    },
    {
      name: 'Opalhouse 15oz jar',
      waterGrams: 490,
      diameter: 3.75,
      wicks: ['CD 2 (double wicked)']
    },
    {
      name: 'Oui yogurt 5oz jar',
      waterGrams: 128,
      diameter: 2,
      wicks: ['small wicks']
    }
  ];

  const waxes = [
    {
      name: 'Coconut Apricot Wax',
      specificGravity: 0.88,
      meltPoint: {
        F: '121-131°F',
        C: '49.4-55.0°C'
      },
      pourTemperature: {
        F: '175°F',
        C: '79.4°C'
      },
      addFragranceTemperature: {
        F: '190°F',
        C: '87.8°C'
      },
      maxFrangranceLoad: 'up to 15%',
      cureTime: '1-2 days'
    },
    {
      name: 'Golden 464 Soy Wax',
      specificGravity: 0.86,
      meltPoint: {
        F: '113°F',
        C: '45.0°C'
      },
      pourTemperature: {
        F: '135°F',
        C: '57.2°C'
      },
      addFragranceTemperature: {
        F: '185°F',
        C: '85°C'
      },
      maxFrangranceLoad: '6 - 10%',
      cureTime: '1-2 weeks'
    }
  ];

  let tempScale = $state('F');

  let containerType = $state(containers[0]);
  let waxType = $state(waxes[0]);
  let numberOfContainers = $state(1);

  let totalWaterGrams = $derived.by(() => containerType.waterGrams * numberOfContainers);
  
  let containerGroups = $state([]); 
  
  let groupsTotalWaterGrams = $derived.by(() => containerGroups.reduce((total, currentObject) => {
    return total + (currentObject.type.waterGrams * currentObject.quantity);
  }, 0));

  let groupsTotalWaxGrams = $derived.by(() => groupsTotalWaterGrams * waxType.specificGravity);

  let groupNamesList = $derived.by(() => containerGroups.map((containerGroup) => containerGroup.quantity + ' ' +   containerGroup.type.name + (containerGroup.quantity > 1 ? 's' : '')));

  function joinWithAnd(arr) {
  if (arr.length <= 1) {
    return arr.join('');
  }
  const allButLast = arr.slice(0, -1).join(', ');
  const last = arr.slice(-1);
  return `${allButLast}, and ${last}`;
}

</script>

{#snippet Notes(w)}
  <div class="notes">
    <!-- <p><strong>{w.name}</strong></p> -->
    <p>Heat <strong>{w.name}</strong> to <strong>{w.addFragranceTemperature[tempScale]}</strong>, add fragrance (and liquid dye), remove from heat, and stir for 2 minutes.</p>
    <p>Let the wax cool to <strong>{w.pourTemperature[tempScale]}</strong>, then pour into containers.</p>
    <p>Allow candles to cure for {w.cureTime}.</p>
</div>
{/snippet}

{#snippet WaxInfo(w)}
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

<h1>How much wax will I need?</h1>

<form>
    <div class="myrow">
      <div class="mycol">
        <label for="waxType">Wax type
          <select bind:value={waxType} name="waxType" id="waxType">
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
    <hr>
    <div class="myrow">
      <div class="mycol">
        <label for="containerType">Container type
          <select bind:value={containerType} name="containerType" id="containerType">
            {#each containers as container}
            <option value={container}>{container.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="mycol">
        <label for="numberOfContainers">How many?
          <input type="number" name="numberOfContainers" id="numberOfContainers" size="2" bind:value={numberOfContainers}>
        </label>
      </div>
      <div class="mycol">
        <button onclick={() => containerGroups.push({type:containerType, quantity:numberOfContainers})}>Add to groups</button>
      </div>
    </div>
  
</form>
<p><strong>{totalWaterGrams * waxType.specificGravity} grams</strong> of <strong>{waxType.name}</strong> to fill <strong>{numberOfContainers} {containerType.name}{numberOfContainers > 1 ? 's' : ''}</strong>.</p>

<section>
  
  <!-- {#each containerGroups as containerGroup}
    <p>{containerGroup.quantity} {containerGroup.type.name}{containerGroup.quantity > 1 ? 's' : ''}</p>
  {/each} -->

  <!-- <p>{numberOfContainers} {containerType.name}{numberOfContainers > 1 ? 's' : ''}</p> -->

  {#if containerGroups.length > 0}
    <article>
      <header>Groups of containers</header>
      <!-- <hr>
      <p>{JSON.stringify(containerGroups)}</p>
      <p>{JSON.stringify(containers)}</p>
      <hr> -->
      <Table {containers} {containerGroups} {waxType} {groupsTotalWaxGrams} />
    </article>
    <article class="highlight">
      <p><strong>How much wax will I need?</strong></p>
      <p class="result">You'll need to melt <strong>{groupsTotalWaxGrams} grams</strong> of <strong>{waxType.name}</strong> to fill {joinWithAnd(groupNamesList)}</p>
    </article>
  {:else}
    <article>
      <header>Add some containers</header>
    </article>
  {/if}
  </section>


  
<article>
  <header>Instructions</header>
  {@render Notes(waxType)}
</article>
<article>
  <header>Info</header>
  {@render WaxInfo(waxType)}
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