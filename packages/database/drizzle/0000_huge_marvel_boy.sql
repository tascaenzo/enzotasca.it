CREATE TABLE `articles` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`body` text,
	`tag` text NOT NULL,
	`href` text NOT NULL,
	`image` text,
	`image_alt` text,
	`accent` text,
	`display_date` text,
	`published_at` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX `articles_published_at_idx` ON `articles` (`published_at`);--> statement-breakpoint
CREATE TABLE `projects` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`class_name` text NOT NULL,
	`cta` text NOT NULL,
	`display_date` text,
	`href` text NOT NULL,
	`image` text NOT NULL,
	`image_alt` text NOT NULL,
	`meta` text NOT NULL,
	`published_at` text NOT NULL,
	`status` text NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	CONSTRAINT "projects_status_check" CHECK("projects"."status" in ('in-progress', 'published'))
);
--> statement-breakpoint
CREATE INDEX `projects_published_at_idx` ON `projects` (`published_at`);