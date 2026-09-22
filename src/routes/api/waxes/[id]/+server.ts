import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { waxesTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const id = parseInt(params.id, 10);
		const data = await request.json();

		const result = await db
			.update(waxesTable)
			.set({
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
			})
			.where(eq(waxesTable.id, id))
			.returning();

		if (!result.length) {
			return json({ error: 'Wax not found' }, { status: 404 });
		}

		return json(result[0]);
	} catch (error) {
		console.error('Error updating wax:', error);
		return json({ error: 'Failed to update wax' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id, 10);

		const result = await db.delete(waxesTable).where(eq(waxesTable.id, id)).returning();

		if (!result.length) {
			return json({ error: 'Wax not found' }, { status: 404 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting wax:', error);
		return json({ error: 'Failed to delete wax' }, { status: 500 });
	}
};
