<script module lang="ts">
  import type { Wax } from '$lib/types';
  import { s } from '$lib/sharedState.svelte'
  export { Notes, WaxInfo }
</script>


{#snippet Notes(w: Wax)}
<div class="notes">
  <p>Heat <strong>{w.name}</strong> to <strong>{w.addFragranceTemperature[s.tempUnit]}</strong>, add fragrance (and liquid dye), remove from heat, and stir for 2 minutes.</p>
  <p>Let the wax cool to <strong>{w.pourTemperature[s.tempUnit]}</strong>, then pour into containers.</p>
  <p>Allow candles to cure for {w.cureTime}.</p>
</div>
{/snippet}

{#snippet WaxInfo(w: Wax)}
  <div class="notes">
    <p><strong>{w.name}</strong></p>
    <p>Add frangrance temperature: {w.addFragranceTemperature[s.tempUnit]}</p>
    <p>Pour temperature: {w.pourTemperature[s.tempUnit]}</p>
    <p>Melt point: {w.meltPoint[s.tempUnit]}</p>
    <p>Specific gravity: {w.specificGravity}</p>
    <p>Max fragrance load: {w.maxFrangranceLoad}</p>
    <p>Cure time: {w.cureTime}</p>
  </div>
{/snippet}