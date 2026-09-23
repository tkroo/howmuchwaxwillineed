<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h2>Log In</h2>

{#if form?.error}
	<p style="color: #b00020;">{form.error}</p>
{/if}

<form method="POST" style="max-width: 28rem;">
	<input type="hidden" name="redirectTo" value={data.redirectTo} />

	<label for="email">Email</label>
	<input
		id="email"
		name="email"
		type="email"
		required
		autocomplete="email"
		value={form?.email ?? ''}
	/>

	<label for="password">Password</label>
	<input id="password" name="password" type="password" required autocomplete="current-password" />

	<button type="submit">Log In</button>
</form>
