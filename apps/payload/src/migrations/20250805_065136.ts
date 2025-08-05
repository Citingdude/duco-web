import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_pages_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_pages_fk";
  
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "highlight_title" jsonb;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "body" jsonb;
  ALTER TABLE "pages_rels" ADD COLUMN "product_types_id" uuid;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "highlight_title" jsonb;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "body" jsonb;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "product_types_id" uuid;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_types_fk" FOREIGN KEY ("product_types_id") REFERENCES "public"."product_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_product_types_fk" FOREIGN KEY ("product_types_id") REFERENCES "public"."product_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_product_types_id_idx" ON "pages_rels" USING btree ("product_types_id","locale");
  CREATE INDEX "_pages_v_rels_product_types_id_idx" ON "_pages_v_rels" USING btree ("product_types_id","locale");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "text";
  ALTER TABLE "pages_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "text";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."cta_variant";
  DROP TYPE "public"."cta_type";
  DROP TYPE "public"."link_type";
  DROP TYPE "public"."cta_event";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."cta_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."cta_type" AS ENUM('link', 'event');
  CREATE TYPE "public"."link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."cta_event" AS ENUM('some_form');
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cta_label" varchar,
  	"cta_cta_variant" "cta_variant" DEFAULT 'primary',
  	"cta_cta_type" "cta_type" DEFAULT 'link',
  	"cta_link_type" "link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean DEFAULT false,
  	"cta_link_url" varchar,
  	"cta_event" "cta_event" DEFAULT 'some_form',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_product_types_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_product_types_fk";
  
  DROP INDEX "pages_rels_product_types_id_idx";
  DROP INDEX "_pages_v_rels_product_types_id_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "pages_id" uuid;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "text" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "pages_id" uuid;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_locale_idx" ON "pages_blocks_hero_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_locale_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_locale");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "highlight_title";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "body";
  ALTER TABLE "pages_rels" DROP COLUMN "product_types_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "highlight_title";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "body";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "product_types_id";`)
}
