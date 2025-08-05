import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_employees_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__employees_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__employees_v_published_locale" AS ENUM('en', 'nl', 'fr');
  CREATE TABLE "employees" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_employees_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "employees_locales" (
  	"name" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_employees_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_image_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__employees_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__employees_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_employees_v_locales" (
  	"version_name" varchar,
  	"version_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "employees_id" uuid;
  ALTER TABLE "employees" ADD CONSTRAINT "employees_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employees_locales" ADD CONSTRAINT "employees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_employees_v" ADD CONSTRAINT "_employees_v_parent_id_employees_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."employees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_employees_v" ADD CONSTRAINT "_employees_v_version_image_id_images_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_employees_v_locales" ADD CONSTRAINT "_employees_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_employees_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "employees_image_idx" ON "employees" USING btree ("image_id");
  CREATE INDEX "employees_updated_at_idx" ON "employees" USING btree ("updated_at");
  CREATE INDEX "employees_created_at_idx" ON "employees" USING btree ("created_at");
  CREATE INDEX "employees__status_idx" ON "employees" USING btree ("_status");
  CREATE UNIQUE INDEX "employees_locales_locale_parent_id_unique" ON "employees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_employees_v_parent_idx" ON "_employees_v" USING btree ("parent_id");
  CREATE INDEX "_employees_v_version_version_image_idx" ON "_employees_v" USING btree ("version_image_id");
  CREATE INDEX "_employees_v_version_version_updated_at_idx" ON "_employees_v" USING btree ("version_updated_at");
  CREATE INDEX "_employees_v_version_version_created_at_idx" ON "_employees_v" USING btree ("version_created_at");
  CREATE INDEX "_employees_v_version_version__status_idx" ON "_employees_v" USING btree ("version__status");
  CREATE INDEX "_employees_v_created_at_idx" ON "_employees_v" USING btree ("created_at");
  CREATE INDEX "_employees_v_updated_at_idx" ON "_employees_v" USING btree ("updated_at");
  CREATE INDEX "_employees_v_snapshot_idx" ON "_employees_v" USING btree ("snapshot");
  CREATE INDEX "_employees_v_published_locale_idx" ON "_employees_v" USING btree ("published_locale");
  CREATE INDEX "_employees_v_latest_idx" ON "_employees_v" USING btree ("latest");
  CREATE INDEX "_employees_v_autosave_idx" ON "_employees_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_employees_v_locales_locale_parent_id_unique" ON "_employees_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_employees_fk" FOREIGN KEY ("employees_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_employees_id_idx" ON "payload_locked_documents_rels" USING btree ("employees_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "employees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "employees_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_employees_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_employees_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "employees" CASCADE;
  DROP TABLE "employees_locales" CASCADE;
  DROP TABLE "_employees_v" CASCADE;
  DROP TABLE "_employees_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_employees_fk";
  
  DROP INDEX "payload_locked_documents_rels_employees_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "employees_id";
  DROP TYPE "public"."enum_employees_status";
  DROP TYPE "public"."enum__employees_v_version_status";
  DROP TYPE "public"."enum__employees_v_published_locale";`)
}
