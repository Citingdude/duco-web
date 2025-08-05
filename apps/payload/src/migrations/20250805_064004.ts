import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_references_type" AS ENUM('case', 'gallery');
  CREATE TYPE "public"."enum_references_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__references_v_version_type" AS ENUM('case', 'gallery');
  CREATE TYPE "public"."enum__references_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__references_v_published_locale" AS ENUM('en', 'nl', 'fr');
  CREATE TABLE "references" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"type" "enum_references_type",
  	"product_type_id" uuid,
  	"image_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_references_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "references_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_references_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_type" "enum__references_v_version_type",
  	"version_product_type_id" uuid,
  	"version_image_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__references_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__references_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_references_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "references_id" uuid;
  ALTER TABLE "references" ADD CONSTRAINT "references_product_type_id_product_types_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "public"."product_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "references" ADD CONSTRAINT "references_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "references_locales" ADD CONSTRAINT "references_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."references"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_references_v" ADD CONSTRAINT "_references_v_parent_id_references_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."references"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_references_v" ADD CONSTRAINT "_references_v_version_product_type_id_product_types_id_fk" FOREIGN KEY ("version_product_type_id") REFERENCES "public"."product_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_references_v" ADD CONSTRAINT "_references_v_version_image_id_images_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_references_v_locales" ADD CONSTRAINT "_references_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_references_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "references_product_type_idx" ON "references" USING btree ("product_type_id");
  CREATE INDEX "references_image_idx" ON "references" USING btree ("image_id");
  CREATE INDEX "references_updated_at_idx" ON "references" USING btree ("updated_at");
  CREATE INDEX "references_created_at_idx" ON "references" USING btree ("created_at");
  CREATE INDEX "references__status_idx" ON "references" USING btree ("_status");
  CREATE INDEX "references_slug_idx" ON "references_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "references_locales_locale_parent_id_unique" ON "references_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_references_v_parent_idx" ON "_references_v" USING btree ("parent_id");
  CREATE INDEX "_references_v_version_version_product_type_idx" ON "_references_v" USING btree ("version_product_type_id");
  CREATE INDEX "_references_v_version_version_image_idx" ON "_references_v" USING btree ("version_image_id");
  CREATE INDEX "_references_v_version_version_updated_at_idx" ON "_references_v" USING btree ("version_updated_at");
  CREATE INDEX "_references_v_version_version_created_at_idx" ON "_references_v" USING btree ("version_created_at");
  CREATE INDEX "_references_v_version_version__status_idx" ON "_references_v" USING btree ("version__status");
  CREATE INDEX "_references_v_created_at_idx" ON "_references_v" USING btree ("created_at");
  CREATE INDEX "_references_v_updated_at_idx" ON "_references_v" USING btree ("updated_at");
  CREATE INDEX "_references_v_snapshot_idx" ON "_references_v" USING btree ("snapshot");
  CREATE INDEX "_references_v_published_locale_idx" ON "_references_v" USING btree ("published_locale");
  CREATE INDEX "_references_v_latest_idx" ON "_references_v" USING btree ("latest");
  CREATE INDEX "_references_v_autosave_idx" ON "_references_v" USING btree ("autosave");
  CREATE INDEX "_references_v_version_version_slug_idx" ON "_references_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_references_v_locales_locale_parent_id_unique" ON "_references_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_references_fk" FOREIGN KEY ("references_id") REFERENCES "public"."references"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_references_id_idx" ON "payload_locked_documents_rels" USING btree ("references_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "references_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_references_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_references_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "references" CASCADE;
  DROP TABLE "references_locales" CASCADE;
  DROP TABLE "_references_v" CASCADE;
  DROP TABLE "_references_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_references_fk";
  
  DROP INDEX "payload_locked_documents_rels_references_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "references_id";
  DROP TYPE "public"."enum_references_type";
  DROP TYPE "public"."enum_references_status";
  DROP TYPE "public"."enum__references_v_version_type";
  DROP TYPE "public"."enum__references_v_version_status";
  DROP TYPE "public"."enum__references_v_published_locale";`)
}
