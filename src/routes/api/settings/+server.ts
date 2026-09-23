import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { settingsTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		let settings = await db.query.settingsTable.findFirst();

		// Initialize settings if they don't exist
		if (!settings) {
			const result = await db.insert(settingsTable).values({}).returning();
			settings = result[0];
		}

		return json(settings);
	} catch (error) {
		console.error('Error fetching settings:', error);
		return json({ error: 'Failed to fetch settings' }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Get or create settings
		let settings = await db.query.settingsTable.findFirst();

		if (!settings) {
			const result = await db
				.insert(settingsTable)
				.values({
					defaultContainerId: data.defaultContainerId,
					defaultWaxId: data.defaultWaxId,
					defaultTempUnit: data.defaultTempUnit || 'F'
				})
				.returning();
			return json(result[0]);
		}

		const result = await db
			.update(settingsTable)
			.set({
				defaultContainerId: data.defaultContainerId,
				defaultWaxId: data.defaultWaxId,
				defaultTempUnit: data.defaultTempUnit || 'F'
			})
			.where(eq(settingsTable.id, settings.id))
			.returning();

		return json(result[0]);
	} catch (error) {
		console.error('Error updating settings:', error);
		return json({ error: 'Failed to update settings' }, { status: 500 });
	}
};
