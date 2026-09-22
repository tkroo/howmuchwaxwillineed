import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { containersTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const id = parseInt(params.id, 10);
		const data = await request.json();

		const result = await db
			.update(containersTable)
			.set({
				name: data.name,
				waterGrams: data.waterGrams,
				diameter: data.diameter,
				wicks: data.wicks
			})
			.where(eq(containersTable.id, id))
			.returning();

		if (!result.length) {
			return json({ error: 'Container not found' }, { status: 404 });
		}

		return json(result[0]);
	} catch (error) {
		console.error('Error updating container:', error);
		return json({ error: 'Failed to update container' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id, 10);

		const result = await db.delete(containersTable).where(eq(containersTable.id, id)).returning();

		if (!result.length) {
			return json({ error: 'Container not found' }, { status: 404 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error deleting container:', error);
		return json({ error: 'Failed to delete container' }, { status: 500 });
	}
};
