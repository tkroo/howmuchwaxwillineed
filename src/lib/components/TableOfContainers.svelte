<script>
  import { containers } from '$lib/appConstants';
</script>

<table>
  <thead>
    <tr>
      {#each Object.keys(containers[0]) as key}
        <th>{key}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each containers as wax}
      <tr>
        {#each Object.values(wax) as value}
        <td>{value}</td>
          <!-- {#if value instanceof Object}
            <td>{value[s.tempUnit]}</td>
          {:else}
          {/if} -->
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<!-- <table>
  <thead>
    <tr>
      <th>Wax Type</th>
      <th>Pour Temp</th>
      <th>Add Fragance Temp</th>
      <th>Melt Point</th>
      <th>Specific Gravity</th>
      <th>Max Fragrance Load</th>
      <th>Cure Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{s.waxType.name}</td>
      <td>{s.waxType.pourTemperature[s.tempUnit]}</td>
      <td>{s.waxType.addFragranceTemperature[s.tempUnit]}</td>
      <td>{s.waxType.meltPoint[s.tempUnit]}</td>
      <td>{s.waxType.specificGravity}</td>
      <td>{s.waxType.maxFrangranceLoad}</td>
      <td>{s.waxType.cureTime}</td>
    </tr>

  </tbody>
</table> -->