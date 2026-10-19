CREATE TABLE "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" text NOT NULL,
	"resume_data" text NOT NULL,
	"last_modified" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"image" text,
	"provider" text,
	"provider_account_id" text,
	"raw_user" jsonb,
	"last_sign_in_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;