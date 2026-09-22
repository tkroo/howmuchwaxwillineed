CREATE TABLE "containers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"water_grams" numeric(10, 2) NOT NULL,
	"diameter" numeric(10, 2) NOT NULL,
	"wicks" json DEFAULT '[]'::json NOT NULL,
	"created_at" varchar DEFAULT '2026-09-22T23:33:46.497Z' NOT NULL,
	CONSTRAINT "containers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "waxes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"add_fragrance_temperature_f" varchar(50) NOT NULL,
	"add_fragrance_temperature_c" varchar(50) NOT NULL,
	"pour_temperature_f" varchar(50) NOT NULL,
	"pour_temperature_c" varchar(50) NOT NULL,
	"melt_point_f" varchar(50) NOT NULL,
	"melt_point_c" varchar(50) NOT NULL,
	"specific_gravity" numeric(10, 2) NOT NULL,
	"max_fragrance_load" varchar(50) NOT NULL,
	"cure_time" varchar(50) NOT NULL,
	"created_at" varchar DEFAULT '2026-09-22T23:33:46.499Z' NOT NULL,
	CONSTRAINT "waxes_name_unique" UNIQUE("name")
);
