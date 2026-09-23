import { db } from '$lib/db';
import { containersTable, waxesTable } from '$lib/db/schema';
import { containers, waxes } from '$lib/appConstants';
import { json, type RequestHandler } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';

export const POST: RequestHandler = async (event) => {
	try {
		const unauthorized = await requireAuth(event);
		if (unauthorized) return unauthorized;

		console.log('Starting database seed...');

		// Add containers
		for (const container of containers) {
			await db
				.insert(containersTable)
				.values({
					name: container.name,
					waterGrams: container.waterGrams,
					diameter: container.diameter,
					wicks: container.wicks
				})
				.onConflictDoNothing();
		}
		console.log(`✓ Seeded ${containers.length} containers`);

		// Add waxes
		for (const wax of waxes) {
			await db
				.insert(waxesTable)
				.values({
					name: wax.name,
					addFragranceTemperatureF: wax.addFragranceTemperature.F,
					addFragranceTemperatureC: wax.addFragranceTemperature.C,
					pourTemperatureF: wax.pourTemperature.F,
					pourTemperatureC: wax.pourTemperature.C,
					meltPointF: wax.meltPoint.F,
					meltPointC: wax.meltPoint.C,
					specificGravity: wax.specificGravity.toString(),
					maxFragranceLoad: wax.maxFrangranceLoad,
					cureTime: wax.cureTime
				})
				.onConflictDoNothing();
		}
		console.log(`✓ Seeded ${waxes.length} waxes`);

		return json(
			{
				success: true,
				message: `Database seeded with ${containers.length} containers and ${waxes.length} waxes`
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Seeding failed:', error);
		return json({ error: 'Failed to seed database' }, { status: 500 });
	}
};
