import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_environments_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__environments_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__environments_v_published_locale" AS ENUM('en', 'nl', 'fr');
  CREATE TABLE "environments" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"icon_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_environments_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "environments_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_environments_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_icon_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__environments_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__environments_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_environments_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "environments_id" uuid;
  ALTER TABLE "environments" ADD CONSTRAINT "environments_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "environments_locales" ADD CONSTRAINT "environments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."environments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_environments_v" ADD CONSTRAINT "_environments_v_parent_id_environments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."environments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_environments_v" ADD CONSTRAINT "_environments_v_version_icon_id_icons_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_environments_v_locales" ADD CONSTRAINT "_environments_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_environments_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "environments_icon_idx" ON "environments" USING btree ("icon_id");
  CREATE INDEX "environments_updated_at_idx" ON "environments" USING btree ("updated_at");
  CREATE INDEX "environments_created_at_idx" ON "environments" USING btree ("created_at");
  CREATE INDEX "environments__status_idx" ON "environments" USING btree ("_status");
  CREATE INDEX "environments_slug_idx" ON "environments_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "environments_locales_locale_parent_id_unique" ON "environments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_environments_v_parent_idx" ON "_environments_v" USING btree ("parent_id");
  CREATE INDEX "_environments_v_version_version_icon_idx" ON "_environments_v" USING btree ("version_icon_id");
  CREATE INDEX "_environments_v_version_version_updated_at_idx" ON "_environments_v" USING btree ("version_updated_at");
  CREATE INDEX "_environments_v_version_version_created_at_idx" ON "_environments_v" USING btree ("version_created_at");
  CREATE INDEX "_environments_v_version_version__status_idx" ON "_environments_v" USING btree ("version__status");
  CREATE INDEX "_environments_v_created_at_idx" ON "_environments_v" USING btree ("created_at");
  CREATE INDEX "_environments_v_updated_at_idx" ON "_environments_v" USING btree ("updated_at");
  CREATE INDEX "_environments_v_snapshot_idx" ON "_environments_v" USING btree ("snapshot");
  CREATE INDEX "_environments_v_published_locale_idx" ON "_environments_v" USING btree ("published_locale");
  CREATE INDEX "_environments_v_latest_idx" ON "_environments_v" USING btree ("latest");
  CREATE INDEX "_environments_v_autosave_idx" ON "_environments_v" USING btree ("autosave");
  CREATE INDEX "_environments_v_version_version_slug_idx" ON "_environments_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_environments_v_locales_locale_parent_id_unique" ON "_environments_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_environments_fk" FOREIGN KEY ("environments_id") REFERENCES "public"."environments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_environments_id_idx" ON "payload_locked_documents_rels" USING btree ("environments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "environments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "environments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_environments_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_environments_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "environments" CASCADE;
  DROP TABLE "environments_locales" CASCADE;
  DROP TABLE "_environments_v" CASCADE;
  DROP TABLE "_environments_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_environments_fk";
  
  DROP INDEX "payload_locked_documents_rels_environments_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "environments_id";
  DROP TYPE "public"."enum_environments_status";
  DROP TYPE "public"."enum__environments_v_version_status";
  DROP TYPE "public"."enum__environments_v_published_locale";`)
}
