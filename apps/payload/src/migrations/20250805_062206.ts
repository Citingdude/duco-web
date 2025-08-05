import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_types_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_types_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_types_v_published_locale" AS ENUM('en', 'nl', 'fr');
  CREATE TABLE "product_types" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"icon_id" uuid,
  	"image_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_types_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "product_types_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_product_types_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_icon_id" uuid,
  	"version_image_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_types_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__product_types_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_product_types_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_types_id" uuid;
  ALTER TABLE "product_types" ADD CONSTRAINT "product_types_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_types" ADD CONSTRAINT "product_types_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_types_locales" ADD CONSTRAINT "product_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_types_v" ADD CONSTRAINT "_product_types_v_parent_id_product_types_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_types_v" ADD CONSTRAINT "_product_types_v_version_icon_id_icons_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_types_v" ADD CONSTRAINT "_product_types_v_version_image_id_images_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_types_v_locales" ADD CONSTRAINT "_product_types_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_types_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_types_icon_idx" ON "product_types" USING btree ("icon_id");
  CREATE INDEX "product_types_image_idx" ON "product_types" USING btree ("image_id");
  CREATE INDEX "product_types_updated_at_idx" ON "product_types" USING btree ("updated_at");
  CREATE INDEX "product_types_created_at_idx" ON "product_types" USING btree ("created_at");
  CREATE INDEX "product_types__status_idx" ON "product_types" USING btree ("_status");
  CREATE INDEX "product_types_slug_idx" ON "product_types_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "product_types_locales_locale_parent_id_unique" ON "product_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_product_types_v_parent_idx" ON "_product_types_v" USING btree ("parent_id");
  CREATE INDEX "_product_types_v_version_version_icon_idx" ON "_product_types_v" USING btree ("version_icon_id");
  CREATE INDEX "_product_types_v_version_version_image_idx" ON "_product_types_v" USING btree ("version_image_id");
  CREATE INDEX "_product_types_v_version_version_updated_at_idx" ON "_product_types_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_types_v_version_version_created_at_idx" ON "_product_types_v" USING btree ("version_created_at");
  CREATE INDEX "_product_types_v_version_version__status_idx" ON "_product_types_v" USING btree ("version__status");
  CREATE INDEX "_product_types_v_created_at_idx" ON "_product_types_v" USING btree ("created_at");
  CREATE INDEX "_product_types_v_updated_at_idx" ON "_product_types_v" USING btree ("updated_at");
  CREATE INDEX "_product_types_v_snapshot_idx" ON "_product_types_v" USING btree ("snapshot");
  CREATE INDEX "_product_types_v_published_locale_idx" ON "_product_types_v" USING btree ("published_locale");
  CREATE INDEX "_product_types_v_latest_idx" ON "_product_types_v" USING btree ("latest");
  CREATE INDEX "_product_types_v_autosave_idx" ON "_product_types_v" USING btree ("autosave");
  CREATE INDEX "_product_types_v_version_version_slug_idx" ON "_product_types_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_product_types_v_locales_locale_parent_id_unique" ON "_product_types_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_types_fk" FOREIGN KEY ("product_types_id") REFERENCES "public"."product_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_product_types_id_idx" ON "payload_locked_documents_rels" USING btree ("product_types_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_types_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_types_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_types_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_types" CASCADE;
  DROP TABLE "product_types_locales" CASCADE;
  DROP TABLE "_product_types_v" CASCADE;
  DROP TABLE "_product_types_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_types_fk";
  
  DROP INDEX "payload_locked_documents_rels_product_types_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_types_id";
  DROP TYPE "public"."enum_product_types_status";
  DROP TYPE "public"."enum__product_types_v_version_status";
  DROP TYPE "public"."enum__product_types_v_published_locale";`)
}
