import { memo } from "react";
import { cx } from "@/lib/functions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownCard = memo(function MarkdownCard({ markdown }: { markdown: string }) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-2xl",
        "dark:border-zinc-800/70 dark:bg-zinc-900/40 mb-4"
      )}
    >
      <article className="prose prose-sm max-w-none text-left dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
});

export default MarkdownCard;
