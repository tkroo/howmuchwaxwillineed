import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { waxesTable, type InsertWax } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		const waxes = await db.query.waxesTable.findMany();
		return json(waxes);
	} catch (error) {
		console.error('Error fetching waxes:', error);
		return json({ error: 'Failed to fetch waxes' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const newWax: InsertWax = {
			name: data.name,
			addFragranceTemperatureF: data.addFragranceTemperatureF,
			addFragranceTemperatureC: data.addFragranceTemperatureC,
			pourTemperatureF: data.pourTemperatureF,
			pourTemperatureC: data.pourTemperatureC,
			meltPointF: data.meltPointF,
			meltPointC: data.meltPointC,
			specificGravity: data.specificGravity,
			maxFragranceLoad: data.maxFragranceLoad,
			cureTime: data.cureTime
		};

		const result = await db.insert(waxesTable).values(newWax).returning();
		return json(result[0], { status: 201 });
	} catch (error) {
		console.error('Error creating wax:', error);
		return json({ error: 'Failed to create wax' }, { status: 500 });
	}
};
