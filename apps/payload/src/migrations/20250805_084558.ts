import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_kpi_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_kpi_kpi_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kpi_title" varchar,
  	"kpi_value" varchar,
  	"kpi_subtitle" varchar
  );
  
  CREATE TABLE "pages_blocks_kpi" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kpi_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kpi_kpi_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"kpi_title" varchar,
  	"kpi_value" varchar,
  	"kpi_subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_kpi" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "pages_id" uuid;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "pages_id" uuid;
  ALTER TABLE "pages_blocks_kpi_buttons" ADD CONSTRAINT "pages_blocks_kpi_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_kpi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kpi_kpi_items" ADD CONSTRAINT "pages_blocks_kpi_kpi_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_kpi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_kpi" ADD CONSTRAINT "pages_blocks_kpi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD CONSTRAINT "_pages_v_blocks_kpi_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_kpi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kpi_kpi_items" ADD CONSTRAINT "_pages_v_blocks_kpi_kpi_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_kpi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_kpi" ADD CONSTRAINT "_pages_v_blocks_kpi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_kpi_buttons_order_idx" ON "pages_blocks_kpi_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_kpi_buttons_parent_id_idx" ON "pages_blocks_kpi_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kpi_buttons_locale_idx" ON "pages_blocks_kpi_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_kpi_kpi_items_order_idx" ON "pages_blocks_kpi_kpi_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_kpi_kpi_items_parent_id_idx" ON "pages_blocks_kpi_kpi_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kpi_kpi_items_locale_idx" ON "pages_blocks_kpi_kpi_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_kpi_order_idx" ON "pages_blocks_kpi" USING btree ("_order");
  CREATE INDEX "pages_blocks_kpi_parent_id_idx" ON "pages_blocks_kpi" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_kpi_path_idx" ON "pages_blocks_kpi" USING btree ("_path");
  CREATE INDEX "pages_blocks_kpi_locale_idx" ON "pages_blocks_kpi" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_kpi_buttons_order_idx" ON "_pages_v_blocks_kpi_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kpi_buttons_parent_id_idx" ON "_pages_v_blocks_kpi_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kpi_buttons_locale_idx" ON "_pages_v_blocks_kpi_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_kpi_kpi_items_order_idx" ON "_pages_v_blocks_kpi_kpi_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kpi_kpi_items_parent_id_idx" ON "_pages_v_blocks_kpi_kpi_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kpi_kpi_items_locale_idx" ON "_pages_v_blocks_kpi_kpi_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_kpi_order_idx" ON "_pages_v_blocks_kpi" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_kpi_parent_id_idx" ON "_pages_v_blocks_kpi" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_kpi_path_idx" ON "_pages_v_blocks_kpi" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_kpi_locale_idx" ON "_pages_v_blocks_kpi" USING btree ("_locale");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_kpi_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_kpi_kpi_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_kpi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_kpi_kpi_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_kpi" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_kpi_buttons" CASCADE;
  DROP TABLE "pages_blocks_kpi_kpi_items" CASCADE;
  DROP TABLE "pages_blocks_kpi" CASCADE;
  DROP TABLE "_pages_v_blocks_kpi_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_kpi_kpi_items" CASCADE;
  DROP TABLE "_pages_v_blocks_kpi" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_pages_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_pages_fk";
  
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."link_type";`)
}
