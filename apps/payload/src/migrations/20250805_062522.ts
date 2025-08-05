import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_audience_segment_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__audience_segment_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__audience_segment_v_published_locale" AS ENUM('en', 'nl', 'fr');
  CREATE TABLE "audience_segment" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"icon_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_audience_segment_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "audience_segment_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_audience_segment_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_icon_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__audience_segment_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__audience_segment_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_audience_segment_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audience_segment_id" uuid;
  ALTER TABLE "audience_segment" ADD CONSTRAINT "audience_segment_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audience_segment_locales" ADD CONSTRAINT "audience_segment_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."audience_segment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_audience_segment_v" ADD CONSTRAINT "_audience_segment_v_parent_id_audience_segment_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."audience_segment"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_audience_segment_v" ADD CONSTRAINT "_audience_segment_v_version_icon_id_icons_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_audience_segment_v_locales" ADD CONSTRAINT "_audience_segment_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_audience_segment_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "audience_segment_icon_idx" ON "audience_segment" USING btree ("icon_id");
  CREATE INDEX "audience_segment_updated_at_idx" ON "audience_segment" USING btree ("updated_at");
  CREATE INDEX "audience_segment_created_at_idx" ON "audience_segment" USING btree ("created_at");
  CREATE INDEX "audience_segment__status_idx" ON "audience_segment" USING btree ("_status");
  CREATE INDEX "audience_segment_slug_idx" ON "audience_segment_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "audience_segment_locales_locale_parent_id_unique" ON "audience_segment_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_audience_segment_v_parent_idx" ON "_audience_segment_v" USING btree ("parent_id");
  CREATE INDEX "_audience_segment_v_version_version_icon_idx" ON "_audience_segment_v" USING btree ("version_icon_id");
  CREATE INDEX "_audience_segment_v_version_version_updated_at_idx" ON "_audience_segment_v" USING btree ("version_updated_at");
  CREATE INDEX "_audience_segment_v_version_version_created_at_idx" ON "_audience_segment_v" USING btree ("version_created_at");
  CREATE INDEX "_audience_segment_v_version_version__status_idx" ON "_audience_segment_v" USING btree ("version__status");
  CREATE INDEX "_audience_segment_v_created_at_idx" ON "_audience_segment_v" USING btree ("created_at");
  CREATE INDEX "_audience_segment_v_updated_at_idx" ON "_audience_segment_v" USING btree ("updated_at");
  CREATE INDEX "_audience_segment_v_snapshot_idx" ON "_audience_segment_v" USING btree ("snapshot");
  CREATE INDEX "_audience_segment_v_published_locale_idx" ON "_audience_segment_v" USING btree ("published_locale");
  CREATE INDEX "_audience_segment_v_latest_idx" ON "_audience_segment_v" USING btree ("latest");
  CREATE INDEX "_audience_segment_v_autosave_idx" ON "_audience_segment_v" USING btree ("autosave");
  CREATE INDEX "_audience_segment_v_version_version_slug_idx" ON "_audience_segment_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_audience_segment_v_locales_locale_parent_id_unique" ON "_audience_segment_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audience_segment_fk" FOREIGN KEY ("audience_segment_id") REFERENCES "public"."audience_segment"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_audience_segment_id_idx" ON "payload_locked_documents_rels" USING btree ("audience_segment_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "audience_segment" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "audience_segment_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_audience_segment_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_audience_segment_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "audience_segment" CASCADE;
  DROP TABLE "audience_segment_locales" CASCADE;
  DROP TABLE "_audience_segment_v" CASCADE;
  DROP TABLE "_audience_segment_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audience_segment_fk";
  
  DROP INDEX "payload_locked_documents_rels_audience_segment_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "audience_segment_id";
  DROP TYPE "public"."enum_audience_segment_status";
  DROP TYPE "public"."enum__audience_segment_v_version_status";
  DROP TYPE "public"."enum__audience_segment_v_published_locale";`)
}
