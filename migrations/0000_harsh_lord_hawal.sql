CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone,
	"pickup" varchar NOT NULL,
	"destination" varchar NOT NULL,
	"status" varchar DEFAULT 'waiting' NOT NULL,
	"customer_id" varchar NOT NULL,
	"driver_id" varchar,
	CONSTRAINT "orders_status_check" CHECK("status" IN ('waiting', 'processing', 'completed'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"username" varchar(16) NOT NULL,
	"password" varchar(60) NOT NULL,
	"role" varchar(6) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_role_check" CHECK("role" IN ('user', 'driver'))
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_driver_id_users_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
