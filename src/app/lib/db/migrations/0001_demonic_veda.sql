ALTER TABLE "resumes" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "resume_data" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;