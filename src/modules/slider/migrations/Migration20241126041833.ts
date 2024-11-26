import { Migration } from '@mikro-orm/migrations';

export class Migration20241126041833 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "slider" ("id" text not null, "title" text not null, "image_url" text not null, "link" text null, "is_active" boolean not null default true, "order" integer not null default 0, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "slider_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "slider" cascade;');
  }

}
