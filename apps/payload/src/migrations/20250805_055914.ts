import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column_multiple_text_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column_multiple_text_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column_multiple_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column_text_cta_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column_text_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_banner_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column_multiple_text_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column_multiple_text_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column_multiple_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column_text_cta_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column_text_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_banner_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_banner" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_column_multiple_text_texts" CASCADE;
  DROP TABLE "pages_blocks_column_multiple_text_ctas" CASCADE;
  DROP TABLE "pages_blocks_column_multiple_text" CASCADE;
  DROP TABLE "pages_blocks_column_text_cta_ctas" CASCADE;
  DROP TABLE "pages_blocks_column_text_cta" CASCADE;
  DROP TABLE "pages_blocks_column_columns" CASCADE;
  DROP TABLE "pages_blocks_column" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_carousel" CASCADE;
  DROP TABLE "pages_blocks_banner_ctas" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_column_multiple_text_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_column_multiple_text_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_column_multiple_text" CASCADE;
  DROP TABLE "_pages_v_blocks_column_text_cta_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_column_text_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_column_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_column" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_banner_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_images_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_images_fk";
  
  DROP INDEX "pages_rels_images_id_idx";
  DROP INDEX "_pages_v_rels_images_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "images_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "images_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_multiple_text_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_column_multiple_text_ctas" (
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
  
  CREATE TABLE "pages_blocks_column_multiple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_text_cta_ctas" (
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
  
  CREATE TABLE "pages_blocks_column_text_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_column_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_banner_ctas" (
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
  
  CREATE TABLE "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"icon_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_multiple_text_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"subtitle" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_multiple_text_ctas" (
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
  
  CREATE TABLE "_pages_v_blocks_column_multiple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_text_cta_ctas" (
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
  
  CREATE TABLE "_pages_v_blocks_column_text_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_banner_ctas" (
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
  
  CREATE TABLE "_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"icon_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "images_id" uuid;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "images_id" uuid;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_multiple_text_texts" ADD CONSTRAINT "pages_blocks_column_multiple_text_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_multiple_text_ctas" ADD CONSTRAINT "pages_blocks_column_multiple_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_multiple_text" ADD CONSTRAINT "pages_blocks_column_multiple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_text_cta_ctas" ADD CONSTRAINT "pages_blocks_column_text_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column_text_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_text_cta" ADD CONSTRAINT "pages_blocks_column_text_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column_columns" ADD CONSTRAINT "pages_blocks_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_column" ADD CONSTRAINT "pages_blocks_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel" ADD CONSTRAINT "pages_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner_ctas" ADD CONSTRAINT "pages_blocks_banner_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_multiple_text_texts" ADD CONSTRAINT "_pages_v_blocks_column_multiple_text_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_multiple_text_ctas" ADD CONSTRAINT "_pages_v_blocks_column_multiple_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_multiple_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_multiple_text" ADD CONSTRAINT "_pages_v_blocks_column_multiple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_text_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_column_text_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column_text_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_text_cta" ADD CONSTRAINT "_pages_v_blocks_column_text_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column_columns" ADD CONSTRAINT "_pages_v_blocks_column_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_column" ADD CONSTRAINT "_pages_v_blocks_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel" ADD CONSTRAINT "_pages_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_ctas" ADD CONSTRAINT "_pages_v_blocks_banner_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_locale_idx" ON "pages_blocks_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_multiple_text_texts_order_idx" ON "pages_blocks_column_multiple_text_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_multiple_text_texts_parent_id_idx" ON "pages_blocks_column_multiple_text_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_multiple_text_texts_locale_idx" ON "pages_blocks_column_multiple_text_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_multiple_text_ctas_order_idx" ON "pages_blocks_column_multiple_text_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_multiple_text_ctas_parent_id_idx" ON "pages_blocks_column_multiple_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_multiple_text_ctas_locale_idx" ON "pages_blocks_column_multiple_text_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_multiple_text_order_idx" ON "pages_blocks_column_multiple_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_multiple_text_parent_id_idx" ON "pages_blocks_column_multiple_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_multiple_text_path_idx" ON "pages_blocks_column_multiple_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_multiple_text_locale_idx" ON "pages_blocks_column_multiple_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_text_cta_ctas_order_idx" ON "pages_blocks_column_text_cta_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_text_cta_ctas_parent_id_idx" ON "pages_blocks_column_text_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_text_cta_ctas_locale_idx" ON "pages_blocks_column_text_cta_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_text_cta_order_idx" ON "pages_blocks_column_text_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_text_cta_parent_id_idx" ON "pages_blocks_column_text_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_text_cta_path_idx" ON "pages_blocks_column_text_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_text_cta_locale_idx" ON "pages_blocks_column_text_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_columns_order_idx" ON "pages_blocks_column_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_columns_parent_id_idx" ON "pages_blocks_column_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_columns_locale_idx" ON "pages_blocks_column_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_column_order_idx" ON "pages_blocks_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_column_parent_id_idx" ON "pages_blocks_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_column_path_idx" ON "pages_blocks_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_column_locale_idx" ON "pages_blocks_column" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_locale_idx" ON "pages_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_carousel_order_idx" ON "pages_blocks_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_parent_id_idx" ON "pages_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_path_idx" ON "pages_blocks_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_locale_idx" ON "pages_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_ctas_order_idx" ON "pages_blocks_banner_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_ctas_parent_id_idx" ON "pages_blocks_banner_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_ctas_locale_idx" ON "pages_blocks_banner_ctas" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_banner_locale_idx" ON "pages_blocks_banner" USING btree ("_locale");
  CREATE INDEX "pages_blocks_banner_icon_idx" ON "pages_blocks_banner" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_locale_idx" ON "_pages_v_blocks_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_texts_order_idx" ON "_pages_v_blocks_column_multiple_text_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_texts_parent_id_idx" ON "_pages_v_blocks_column_multiple_text_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_texts_locale_idx" ON "_pages_v_blocks_column_multiple_text_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_ctas_order_idx" ON "_pages_v_blocks_column_multiple_text_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_ctas_parent_id_idx" ON "_pages_v_blocks_column_multiple_text_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_ctas_locale_idx" ON "_pages_v_blocks_column_multiple_text_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_order_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_parent_id_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_path_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_multiple_text_locale_idx" ON "_pages_v_blocks_column_multiple_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_text_cta_ctas_order_idx" ON "_pages_v_blocks_column_text_cta_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_text_cta_ctas_parent_id_idx" ON "_pages_v_blocks_column_text_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_text_cta_ctas_locale_idx" ON "_pages_v_blocks_column_text_cta_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_text_cta_order_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_text_cta_parent_id_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_text_cta_path_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_text_cta_locale_idx" ON "_pages_v_blocks_column_text_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_columns_order_idx" ON "_pages_v_blocks_column_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_columns_parent_id_idx" ON "_pages_v_blocks_column_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_columns_locale_idx" ON "_pages_v_blocks_column_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_column_order_idx" ON "_pages_v_blocks_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_column_parent_id_idx" ON "_pages_v_blocks_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_column_path_idx" ON "_pages_v_blocks_column" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_column_locale_idx" ON "_pages_v_blocks_column" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_locale_idx" ON "_pages_v_blocks_image_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_order_idx" ON "_pages_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_parent_id_idx" ON "_pages_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_path_idx" ON "_pages_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_locale_idx" ON "_pages_v_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_ctas_order_idx" ON "_pages_v_blocks_banner_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_ctas_parent_id_idx" ON "_pages_v_blocks_banner_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_ctas_locale_idx" ON "_pages_v_blocks_banner_ctas" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_banner_locale_idx" ON "_pages_v_blocks_banner" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_banner_icon_idx" ON "_pages_v_blocks_banner" USING btree ("icon_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_images_id_idx" ON "pages_rels" USING btree ("images_id","locale");
  CREATE INDEX "_pages_v_rels_images_id_idx" ON "_pages_v_rels" USING btree ("images_id","locale");`)
}
