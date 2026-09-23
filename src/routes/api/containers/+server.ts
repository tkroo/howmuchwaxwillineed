import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db';
import { containersTable, type InsertContainer } from '$lib/db/schema';
import { requireAuth } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async (event) => {
	try {
		const unauthorized = await requireAuth(event);
		if (unauthorized) return unauthorized;

		const containers = await db.query.containersTable.findMany();
		return json(containers);
	} catch (error) {
		console.error('Error fetching containers:', error);
		return json({ error: 'Failed to fetch containers' }, { status: 500 });
	}
};

export const POST: RequestHandler = async (event) => {
	try {
		const unauthorized = await requireAuth(event);
		if (unauthorized) return unauthorized;

		const data = await event.request.json();
		const newContainer: InsertContainer = {
			name: data.name,
			waterGrams: data.waterGrams,
			diameter: data.diameter,
			wicks: data.wicks
		};

		const result = await db.insert(containersTable).values(newContainer).returning();
		return json(result[0], { status: 201 });
	} catch (error) {
		console.error('Error creating container:', error);
		return json({ error: 'Failed to create container' }, { status: 500 });
	}
};
