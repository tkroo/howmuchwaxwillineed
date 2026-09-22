# Database Setup Guide

This project uses Drizzle ORM with PostgreSQL (Supabase).

## Prerequisites

- Supabase account with a PostgreSQL database
- Node.js and npm installed

## Setup Steps

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Get Your Supabase Connection String

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **Database**
3. Copy the **Connection String** under "Connection pooling" (recommended) or "Direct"
4. Use the pooler connection for better performance: `postgresql://[user]:[password]@[host]:6543/postgres`

### 3. Configure Environment Variables

Add your connection string to `.env.local`:

```
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

Replace `[password]` with your actual database password.

### 4. Initialize Your Database

Apply the schema to your Supabase database:

```bash
npm run db:push
```

This will create the `containers` and `waxes` tables in your database.

### 5. Seed Initial Data (Optional)

To add the initial container and wax data, you can either:

1. Use the `/manage` route to manually add containers and waxes
2. Create a seed script

Create `src/lib/db/seed.ts`:

```typescript
import { db } from './index';
import { containersTable, waxesTable } from './schema';
import { containers, waxes } from '../appConstants';

async function seed() {
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
				specificGravity: wax.specificGravity,
				maxFragranceLoad: wax.maxFrangranceLoad,
				cureTime: wax.cureTime
			})
			.onConflictDoNothing();
	}

	console.log('Database seeded successfully');
	process.exit(0);
}

seed().catch((err) => {
	console.error('Seeding failed:', err);
	process.exit(1);
});
```

Then run: `npx tsx src/lib/db/seed.ts`

## Development

Once set up, you can:

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:5173` to use the app
3. Visit `http://localhost:5173/manage` to add/edit containers and waxes
4. View your database schema: `npm run db:studio`

## API Routes

- `GET /api/containers` - Get all containers
- `POST /api/containers` - Create a new container
- `PUT /api/containers/[id]` - Update a container
- `DELETE /api/containers/[id]` - Delete a container

- `GET /api/waxes` - Get all waxes
- `POST /api/waxes` - Create a new wax
- `PUT /api/waxes/[id]` - Update a wax
- `DELETE /api/waxes/[id]` - Delete a wax

## Troubleshooting

### "Database connection refused"

- Verify your DATABASE_URL is correct
- Check that your Supabase project is active
- Ensure the password in your connection string is correct (especially special characters should be URL-encoded)

### "ENOENT: no such file or directory, open 'drizzle/\*.sql'"

- Run `npm run db:generate` to create migration files

### Changes don't appear in the app

- Make sure you're accessing the app at `http://localhost:5173`
- Try clearing browser cache or using incognito mode
- Check that migrations ran successfully: `npm run db:migrate`

## Supabase-Specific Tips

- Use the **pooler connection** for web applications (port 6543)
- Use the **direct connection** for tools like `drizzle-kit` if you have issues
- Monitor your database usage in Supabase Dashboard > Usage
