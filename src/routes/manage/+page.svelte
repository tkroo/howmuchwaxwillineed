<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let containers = $state(data.containers);
	let waxes = $state(data.waxes);
	let loading = $state(false);
	let error = $state('');
	let success = $state('');

	let activeTab = $state<'containers' | 'waxes'>('containers');

	// Container form state
	let containerForm = $state({
		name: '',
		waterGrams: '',
		diameter: '',
		wicks: ''
	});
	let editingContainerId: number | null = $state(null);

	// Wax form state
	let waxForm = $state({
		name: '',
		addFragranceTemperatureF: '',
		addFragranceTemperatureC: '',
		pourTemperatureF: '',
		pourTemperatureC: '',
		meltPointF: '',
		meltPointC: '',
		specificGravity: '',
		maxFragranceLoad: '',
		cureTime: ''
	});
	let editingWaxId: number | null = $state(null);

	async function handleContainerSubmit() {
		loading = true;
		error = '';
		success = '';

		try {
			const wicksArray = containerForm.wicks
				.split(',')
				.map((w) => w.trim())
				.filter((w) => w);

			const payload = {
				name: containerForm.name,
				waterGrams: parseFloat(containerForm.waterGrams),
				diameter: parseFloat(containerForm.diameter),
				wicks: wicksArray
			};

			const url = editingContainerId ? `/api/containers/${editingContainerId}` : '/api/containers';
			const method = editingContainerId ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) throw new Error('Failed to save container');

			success = `Container ${editingContainerId ? 'updated' : 'created'} successfully!`;
			resetContainerForm();
			await invalidateAll();
			containers = data.containers;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	async function handleWaxSubmit() {
		loading = true;
		error = '';
		success = '';

		try {
			const payload = {
				name: waxForm.name,
				addFragranceTemperatureF: waxForm.addFragranceTemperatureF,
				addFragranceTemperatureC: waxForm.addFragranceTemperatureC,
				pourTemperatureF: waxForm.pourTemperatureF,
				pourTemperatureC: waxForm.pourTemperatureC,
				meltPointF: waxForm.meltPointF,
				meltPointC: waxForm.meltPointC,
				specificGravity: parseFloat(waxForm.specificGravity),
				maxFragranceLoad: waxForm.maxFragranceLoad,
				cureTime: waxForm.cureTime
			};

			const url = editingWaxId ? `/api/waxes/${editingWaxId}` : '/api/waxes';
			const method = editingWaxId ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) throw new Error('Failed to save wax');

			success = `Wax ${editingWaxId ? 'updated' : 'created'} successfully!`;
			resetWaxForm();
			await invalidateAll();
			waxes = data.waxes;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	async function deleteContainer(id: number) {
		if (!confirm('Are you sure you want to delete this container?')) return;

		loading = true;
		error = '';

		try {
			const response = await fetch(`/api/containers/${id}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Failed to delete container');

			success = 'Container deleted successfully!';
			await invalidateAll();
			containers = data.containers;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	async function deleteWax(id: number) {
		if (!confirm('Are you sure you want to delete this wax?')) return;

		loading = true;
		error = '';

		try {
			const response = await fetch(`/api/waxes/${id}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Failed to delete wax');

			success = 'Wax deleted successfully!';
			await invalidateAll();
			waxes = data.waxes;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	function editContainer(container: any) {
		editingContainerId = container.id;
		containerForm = {
			name: container.name,
			waterGrams: container.waterGrams.toString(),
			diameter: container.diameter.toString(),
			wicks: container.wicks.join(', ')
		};
		activeTab = 'containers';
	}

	function editWax(wax: any) {
		editingWaxId = wax.id;
		waxForm = {
			name: wax.name,
			addFragranceTemperatureF: wax.addFragranceTemperatureF,
			addFragranceTemperatureC: wax.addFragranceTemperatureC,
			pourTemperatureF: wax.pourTemperatureF,
			pourTemperatureC: wax.pourTemperatureC,
			meltPointF: wax.meltPointF,
			meltPointC: wax.meltPointC,
			specificGravity: wax.specificGravity.toString(),
			maxFragranceLoad: wax.maxFragranceLoad,
			cureTime: wax.cureTime
		};
		activeTab = 'waxes';
	}

	function resetContainerForm() {
		containerForm = {
			name: '',
			waterGrams: '',
			diameter: '',
			wicks: ''
		};
		editingContainerId = null;
	}

	function resetWaxForm() {
		waxForm = {
			name: '',
			addFragranceTemperatureF: '',
			addFragranceTemperatureC: '',
			pourTemperatureF: '',
			pourTemperatureC: '',
			meltPointF: '',
			meltPointC: '',
			specificGravity: '',
			maxFragranceLoad: '',
			cureTime: ''
		};
		editingWaxId = null;
	}

	async function seedDatabase() {
		loading = true;
		error = '';
		success = '';

		try {
			const response = await fetch('/api/seed', { method: 'POST' });
			if (!response.ok) throw new Error('Failed to seed database');

			const result = await response.json();
			success = result.message;
			await invalidateAll();
			containers = data.containers;
			waxes = data.waxes;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}
</script>

<section>
	<h1>Manage</h1>

	{#if error}
		<article style="background-color: #fee; border: 1px solid #f88;">
			<p><strong>Error:</strong> {error}</p>
		</article>
	{/if}

	{#if success}
		<article style="background-color: #efe; border: 1px solid #8f8;">
			<p><strong>Success:</strong> {success}</p>
		</article>
	{/if}

	{#if containers.length === 0 && waxes.length === 0}
		<article style="background-color: #fef3cd; border: 1px solid #ffc107; padding: 1rem;">
			<p>
				<strong>Database is empty!</strong> You can seed the database with initial containers and waxes
				by clicking the button below.
			</p>
			<button
				onclick={seedDatabase}
				disabled={loading}
				style="margin-top: 0.5rem; background-color: #28a745;"
			>
				{loading ? 'Seeding...' : 'Seed Initial Data'}
			</button>
		</article>
	{/if}

	<div style="display: flex; gap: 1rem; margin: 1rem 0;">
		<button
			onclick={() => (activeTab = 'containers')}
			style={activeTab === 'containers' ? 'font-weight: bold;' : ''}
		>
			Containers
		</button>
		<button
			onclick={() => (activeTab = 'waxes')}
			style={activeTab === 'waxes' ? 'font-weight: bold;' : ''}
		>
			Waxes
		</button>
	</div>

	{#if activeTab === 'containers'}
		<article>
			<header>{editingContainerId ? 'Edit' : 'Add New'} Container</header>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleContainerSubmit();
				}}
			>
				<label>
					Container Name
					<input
						type="text"
						bind:value={containerForm.name}
						required
						disabled={loading}
						placeholder="e.g., Small Apothecary Jar"
					/>
				</label>
				<label>
					Water Grams
					<input
						type="number"
						step="0.01"
						bind:value={containerForm.waterGrams}
						required
						disabled={loading}
						placeholder="e.g., 300"
					/>
				</label>
				<label>
					Diameter (inches)
					<input
						type="number"
						step="0.01"
						bind:value={containerForm.diameter}
						required
						disabled={loading}
						placeholder="e.g., 3"
					/>
				</label>
				<label>
					Wicks (comma-separated)
					<input
						type="text"
						bind:value={containerForm.wicks}
						disabled={loading}
						placeholder="e.g., LX 16, LX 18"
					/>
				</label>
				<div style="display: flex; gap: 0.5rem;">
					<button type="submit" disabled={loading}>
						{loading ? 'Saving...' : editingContainerId ? 'Update' : 'Add'} Container
					</button>
					{#if editingContainerId}
						<button type="button" onclick={resetContainerForm} disabled={loading}> Cancel </button>
					{/if}
				</div>
			</form>
		</article>

		<article>
			<header>Containers</header>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Water (g)</th>
						<th>Diameter</th>
						<th>Wicks</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each containers as container (container.id)}
						<tr>
							<td>{container.name}</td>
							<td>{container.waterGrams}</td>
							<td>{container.diameter}</td>
							<td>{container.wicks.join(', ')}</td>
							<td>
								<button
									onclick={() => editContainer(container)}
									disabled={loading}
									style="padding: 0.25rem 0.5rem; margin-right: 0.5rem;"
								>
									Edit
								</button>
								<button
									onclick={() => deleteContainer(container.id)}
									disabled={loading}
									style="padding: 0.25rem 0.5rem; background-color: #f44;"
								>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</article>
	{:else}
		<article>
			<header>{editingWaxId ? 'Edit' : 'Add New'} Wax</header>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleWaxSubmit();
				}}
			>
				<label>
					Wax Name
					<input
						type="text"
						bind:value={waxForm.name}
						required
						disabled={loading}
						placeholder="e.g., Coconut Apricot Wax"
					/>
				</label>
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
					<label>
						Add Fragrance Temp (°F)
						<input
							type="text"
							bind:value={waxForm.addFragranceTemperatureF}
							required
							disabled={loading}
							placeholder="e.g., 190°F"
						/>
					</label>
					<label>
						Add Fragrance Temp (°C)
						<input
							type="text"
							bind:value={waxForm.addFragranceTemperatureC}
							required
							disabled={loading}
							placeholder="e.g., 87.8°C"
						/>
					</label>
					<label>
						Pour Temp (°F)
						<input
							type="text"
							bind:value={waxForm.pourTemperatureF}
							required
							disabled={loading}
							placeholder="e.g., 175°F"
						/>
					</label>
					<label>
						Pour Temp (°C)
						<input
							type="text"
							bind:value={waxForm.pourTemperatureC}
							required
							disabled={loading}
							placeholder="e.g., 79.4°C"
						/>
					</label>
					<label>
						Melt Point (°F)
						<input
							type="text"
							bind:value={waxForm.meltPointF}
							required
							disabled={loading}
							placeholder="e.g., 121-131°F"
						/>
					</label>
					<label>
						Melt Point (°C)
						<input
							type="text"
							bind:value={waxForm.meltPointC}
							required
							disabled={loading}
							placeholder="e.g., 49.4-55.0°C"
						/>
					</label>
				</div>
				<label>
					Specific Gravity
					<input
						type="number"
						step="0.01"
						bind:value={waxForm.specificGravity}
						required
						disabled={loading}
						placeholder="e.g., 0.88"
					/>
				</label>
				<label>
					Max Fragrance Load
					<input
						type="text"
						bind:value={waxForm.maxFragranceLoad}
						required
						disabled={loading}
						placeholder="e.g., up to 15%"
					/>
				</label>
				<label>
					Cure Time
					<input
						type="text"
						bind:value={waxForm.cureTime}
						required
						disabled={loading}
						placeholder="e.g., 1-2 days"
					/>
				</label>
				<div style="display: flex; gap: 0.5rem;">
					<button type="submit" disabled={loading}>
						{loading ? 'Saving...' : editingWaxId ? 'Update' : 'Add'} Wax
					</button>
					{#if editingWaxId}
						<button type="button" onclick={resetWaxForm} disabled={loading}> Cancel </button>
					{/if}
				</div>
			</form>
		</article>

		<article>
			<header>Waxes</header>
			<div style="overflow-x: auto;">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Add Frag Temp</th>
							<th>Pour Temp</th>
							<th>Melt Point</th>
							<th>Specific Gravity</th>
							<th>Max Load</th>
							<th>Cure Time</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each waxes as wax (wax.id)}
							<tr>
								<td>{wax.name}</td>
								<td>{wax.addFragranceTemperatureF} / {wax.addFragranceTemperatureC}</td>
								<td>{wax.pourTemperatureF} / {wax.pourTemperatureC}</td>
								<td>{wax.meltPointF} / {wax.meltPointC}</td>
								<td>{wax.specificGravity}</td>
								<td>{wax.maxFragranceLoad}</td>
								<td>{wax.cureTime}</td>
								<td>
									<button
										onclick={() => editWax(wax)}
										disabled={loading}
										style="padding: 0.25rem 0.5rem; margin-right: 0.5rem;"
									>
										Edit
									</button>
									<button
										onclick={() => deleteWax(wax.id)}
										disabled={loading}
										style="padding: 0.25rem 0.5rem; background-color: #f44;"
									>
										Delete
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</article>
	{/if}
</section>

<style>
	section {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	button[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	table {
		width: 100%;
	}
</style>
