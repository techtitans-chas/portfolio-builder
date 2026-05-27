CREATE TABLE "app_storage" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"total_bytes_used" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "storage_bytes_used" integer DEFAULT 0 NOT NULL;