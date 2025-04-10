DROP TABLE IF EXISTS "projects";
DROP TABLE IF EXISTS "users";

CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar NOT NULL,
	"email" varchar(256) NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;