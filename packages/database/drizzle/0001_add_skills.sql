CREATE TABLE `skills` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`tags` text NOT NULL,
	`tone` text NOT NULL,
	`tag_variant` text DEFAULT 'default' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	CONSTRAINT "skills_tag_variant_check" CHECK("skills"."tag_variant" in ('default', 'mint'))
);
--> statement-breakpoint
CREATE INDEX `skills_sort_order_idx` ON `skills` (`sort_order`);