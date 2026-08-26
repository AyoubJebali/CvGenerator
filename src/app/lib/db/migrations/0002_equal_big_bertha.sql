ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "resumes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();