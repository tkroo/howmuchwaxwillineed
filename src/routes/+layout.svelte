<script>
  let { children } = $props();
</script>

<svelte:head>
  <title>How much wax do I need?</title>
</svelte:head>

<!-- <header><h1>Candle Wax Calculator</h1></header> -->
<main>
  {@render children()}
</main>