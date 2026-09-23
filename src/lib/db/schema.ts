import { pgTable, serial, text, varchar, numeric, integer, json } from 'drizzle-orm/pg-core';

export const containersTable = pgTable('containers', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	waterGrams: numeric('water_grams', { precision: 10, scale: 2 }).notNull(),
	diameter: numeric('diameter', { precision: 10, scale: 2 }).notNull(),
	wicks: json('wicks').$type<string[]>().notNull().default([]),
	createdAt: varchar('created_at').notNull().default(new Date().toISOString())
});

export const waxesTable = pgTable('waxes', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	addFragranceTemperatureF: varchar('add_fragrance_temperature_f', { length: 50 }).notNull(),
	addFragranceTemperatureC: varchar('add_fragrance_temperature_c', { length: 50 }).notNull(),
	pourTemperatureF: varchar('pour_temperature_f', { length: 50 }).notNull(),
	pourTemperatureC: varchar('pour_temperature_c', { length: 50 }).notNull(),
	meltPointF: varchar('melt_point_f', { length: 50 }).notNull(),
	meltPointC: varchar('melt_point_c', { length: 50 }).notNull(),
	specificGravity: numeric('specific_gravity', { precision: 10, scale: 2 }).notNull(),
	maxFragranceLoad: varchar('max_fragrance_load', { length: 50 }).notNull(),
	cureTime: varchar('cure_time', { length: 50 }).notNull(),
	createdAt: varchar('created_at').notNull().default(new Date().toISOString())
});

export const settingsTable = pgTable('settings', {
	id: serial('id').primaryKey(),
	defaultContainerId: integer('default_container_id'),
	defaultWaxId: integer('default_wax_id'),
	defaultTempUnit: varchar('default_temp_unit', { length: 1 }).default('F')
});

export type Container = typeof containersTable.$inferSelect;
export type InsertContainer = typeof containersTable.$inferInsert;
export type Wax = typeof waxesTable.$inferSelect;
export type InsertWax = typeof waxesTable.$inferInsert;
export type Settings = typeof settingsTable.$inferSelect;
export type InsertSettings = typeof settingsTable.$inferInsert;
