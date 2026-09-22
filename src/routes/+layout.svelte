<script>
	let { children } = $props();
</script>

<svelte:head>
	<title>How much wax will I need?</title>
</svelte:head>

<main>
	<header>
		<h1>How much wax will I need?</h1>
		<nav>
			<a href="/">home</a>
			<a href="/manage">manage</a>
		</nav>
	</header>
	{@render children()}
</main>

<style>
	main {
		padding: 1rem;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}
	nav a {
		margin-right: 1rem;
		text-decoration: none;
		color: #0070f3;
	}
	nav a:hover {
		text-decoration: underline;
	}
</style>
