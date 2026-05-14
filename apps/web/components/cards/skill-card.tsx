import { Card } from "@/components/ui/card";
import { TagList } from "@/components/ui/tag";
import type { Skill } from "@/types/content";

type SkillCardProps = Skill;

export function SkillCard({
  body,
  tagVariant = "default",
  tags,
  title,
  tone,
}: SkillCardProps) {
  const titleId = `skill-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <Card aria-labelledby={titleId} className={`flex min-h-100 p-8 ${tone}`}>
      <div className="flex flex-1 flex-col justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-title-lg" id={titleId}>
            {title}
          </h3>
          <p className="text-body-md text-ds-warm-muted">{body}</p>
        </div>
        <TagList items={tags} label={`${title} tags`} variant={tagVariant} />
      </div>
    </Card>
  );
}
