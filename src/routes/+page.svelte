<script>
  const containers = [
    {
      name: 'Bonne Mamam jam jar',
      waterGrams: 240,
      diameter: 2.75,
      wicks: ['LX 16']
    },
    {
      name: 'OPAL HOUSE 15oz',
      waterGrams: 290,
      diameter: 3.75,
      wicks: ['CD 2 (double wicked)']
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
      name: 'Golden Brands 464 Soy Wax',
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
      cureTime: '1-2 weeks for best hot throw'
    }
  ];

  let containerType = $state(containers[0]);
  let waxType = $state(waxes[0]);
  let numberOfContainers = $state(1);

  let totalWaterGrams = $derived.by(() => containerType.waterGrams * numberOfContainers);

</script>


<h1>Wax Calculator</h1>

<label for="containerType">Container Type: 
  <select name="containerType" id="containerType">
    {#each containers as container}
      <option value={container.name}>{container.name}</option>
    {/each}
  </select>
</label>

<label for="numberOfContainers">How many containers?
  <input type="number" name="numberOfContainers" id="numberOfContainers" bind:value={numberOfContainers}>
</label>

<label for="waxType">Wax Type:
  <select name="waxType" id="waxType">
    {#each waxes as wax}
      <option value={wax.name}>{wax.name}</option>
    {/each}
  </select>
</label>


<p>{numberOfContainers} {containerType.name}{numberOfContainers > 1 ? 's' : ''}</p>
<p>{containerType.waterGrams} * {numberOfContainers} = {totalWaterGrams}g</p>
<p>{waxType.name}</p>
<p>{waxType.specificGravity} * {totalWaterGrams} = {totalWaterGrams * waxType.specificGravity}g of {waxType.name} to be melted</p>