import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."button_variant" AS ENUM('primary', 'secondary');
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "button_label" varchar;
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "button_cta_variant" "button_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "button_link_type" "link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "button_link_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "button_label" varchar;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "button_cta_variant" "button_variant" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "button_link_type" "link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "button_link_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "link_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "link_type" "link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_kpi_buttons" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "link_type" "link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_kpi_buttons" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "button_cta_variant";
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "button_link_type";
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "button_link_new_tab";
  ALTER TABLE "pages_blocks_kpi_buttons" DROP COLUMN "button_link_url";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "button_label";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "button_cta_variant";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "button_link_type";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "button_link_new_tab";
  ALTER TABLE "_pages_v_blocks_kpi_buttons" DROP COLUMN "button_link_url";
  DROP TYPE "public"."button_variant";`)
}
