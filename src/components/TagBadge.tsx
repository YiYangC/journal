import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
}

export default function TagBadge({ tag, clickable = true }: TagBadgeProps) {
  const classes =
    "inline-block text-xs px-3 py-1 border border-[var(--color-border)] text-[var(--color-alt)] rounded-full hover:text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors";

  if (clickable) {
    return (
      <Link href={`/archive/${tag.toLowerCase()}`} className={classes}>
        {tag}
      </Link>
    );
  }

  return <span className={classes}>{tag}</span>;
}
