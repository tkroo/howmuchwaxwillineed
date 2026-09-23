import { db } from '$lib/db';
import type { Wax, TempUnit } from '$lib/types';

export async function load() {
	const rawContainers = await db.query.containersTable.findMany();
	const rawWaxes = await db.query.waxesTable.findMany();
	const settings = await db.query.settingsTable.findFirst();

	// Transform waxes to match the expected Wax type format
	const waxes: Wax[] = rawWaxes.map((wax) => ({
		id: wax.id,
		name: wax.name,
		specificGravity: parseFloat(wax.specificGravity.toString()),
		meltPoint: {
			F: wax.meltPointF,
			C: wax.meltPointC
		},
		pourTemperature: {
			F: wax.pourTemperatureF,
			C: wax.pourTemperatureC
		},
		addFragranceTemperature: {
			F: wax.addFragranceTemperatureF,
			C: wax.addFragranceTemperatureC
		},
		maxFrangranceLoad: wax.maxFragranceLoad,
		cureTime: wax.cureTime
	}));

	return {
		containers: rawContainers,
		waxes,
		defaultContainerId: settings?.defaultContainerId,
		defaultWaxId: settings?.defaultWaxId,
		defaultTempUnit: (settings?.defaultTempUnit || 'F') as TempUnit
	};
}
