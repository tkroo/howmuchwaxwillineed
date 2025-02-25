<script>
  let { children } = $props();
</script>

<svelte:head>
  <title>How much wax do I need?</title>
</svelte:head>

<main>
  <header><h1>How much wax will I need?</h1></header>
  {@render children()}
</main>