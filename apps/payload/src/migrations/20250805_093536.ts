import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_audience_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar,
  	"button_cta_variant" "button_variant" DEFAULT 'primary',
  	"button_link_type" "link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean DEFAULT false,
  	"button_link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audience_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"button_label" varchar,
  	"button_cta_variant" "button_variant" DEFAULT 'primary',
  	"button_link_type" "link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean DEFAULT false,
  	"button_link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audience" (
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
  
  ALTER TABLE "pages_rels" ADD COLUMN "audience_segment_id" uuid;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "audience_segment_id" uuid;
  ALTER TABLE "pages_blocks_audience_buttons" ADD CONSTRAINT "pages_blocks_audience_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience" ADD CONSTRAINT "pages_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_buttons" ADD CONSTRAINT "_pages_v_blocks_audience_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience" ADD CONSTRAINT "_pages_v_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_audience_buttons_order_idx" ON "pages_blocks_audience_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_buttons_parent_id_idx" ON "pages_blocks_audience_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_buttons_locale_idx" ON "pages_blocks_audience_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_audience_order_idx" ON "pages_blocks_audience" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_parent_id_idx" ON "pages_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_path_idx" ON "pages_blocks_audience" USING btree ("_path");
  CREATE INDEX "pages_blocks_audience_locale_idx" ON "pages_blocks_audience" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_audience_buttons_order_idx" ON "_pages_v_blocks_audience_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audience_buttons_parent_id_idx" ON "_pages_v_blocks_audience_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_buttons_locale_idx" ON "_pages_v_blocks_audience_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_audience_order_idx" ON "_pages_v_blocks_audience" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audience_parent_id_idx" ON "_pages_v_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_path_idx" ON "_pages_v_blocks_audience" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_audience_locale_idx" ON "_pages_v_blocks_audience" USING btree ("_locale");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_audience_segment_fk" FOREIGN KEY ("audience_segment_id") REFERENCES "public"."audience_segment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_audience_segment_fk" FOREIGN KEY ("audience_segment_id") REFERENCES "public"."audience_segment"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_audience_segment_id_idx" ON "pages_rels" USING btree ("audience_segment_id","locale");
  CREATE INDEX "_pages_v_rels_audience_segment_id_idx" ON "_pages_v_rels" USING btree ("audience_segment_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_audience_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_audience_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_audience" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_audience_buttons" CASCADE;
  DROP TABLE "pages_blocks_audience" CASCADE;
  DROP TABLE "_pages_v_blocks_audience_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_audience" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_audience_segment_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_audience_segment_fk";
  
  DROP INDEX "pages_rels_audience_segment_id_idx";
  DROP INDEX "_pages_v_rels_audience_segment_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "audience_segment_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "audience_segment_id";`)
}
