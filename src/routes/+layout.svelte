<script>
	let { children, data } = $props();
</script>

<svelte:head>
	<title>How much wax will I need?</title>
</svelte:head>

<main>
	<header>
		<h1><a href="/">How much wax will I need?</a></h1>
		<nav>
			{#if data.session}
				<a href="/manage">manage</a>
				<form method="POST" action="/auth/logout" style="display: inline;">
					<button type="submit">log out</button>
				</form>
			{:else}
				<a href="/login">log in</a>
			{/if}
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
	nav form {
		margin: 0;
	}
	nav button {
		all: unset;
		cursor: pointer;
		color: #0070f3;
		text-decoration: none;
	}
	nav button:hover {
		text-decoration: underline;
	}
	nav a:hover {
		text-decoration: underline;
	}
</style>
