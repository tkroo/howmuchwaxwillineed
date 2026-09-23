import { db } from '$lib/db';

export async function load() {
	const containers = await db.query.containersTable.findMany();
	const waxes = await db.query.waxesTable.findMany();
	const settings = await db.query.settingsTable.findFirst();

	return {
		containers,
		waxes: waxes.map((wax) => ({
			...wax,
			specificGravity: parseFloat(wax.specificGravity.toString()),
			waterGrams: containers.find((c) => c.id)?.waterGrams
		})),
		settings
	};
}
