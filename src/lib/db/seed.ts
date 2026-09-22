import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import { containersTable, waxesTable } from './schema.js';
import { containers, waxes } from '../appConstants.js';
import * as schema from './schema.js';

const { Pool } = pkg;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	console.error('DATABASE_URL environment variable is not set');
	process.exit(1);
}

const pool = new Pool({
	connectionString: databaseUrl
});

const db = drizzle(pool, { schema });

async function seed() {
	try {
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

		console.log('Database seeded successfully!');
		await pool.end();
		process.exit(0);
	} catch (err) {
		console.error('Seeding failed:', err);
		await pool.end();
		process.exit(1);
	}
}

seed();
