"use client";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { useCollapsibleState } from "@/hooks/admin/genereanalyse/useCollapsibleState";
import CollapsibleHeader from "./CollapsibleHeader";
import CollapsibleContent from "./CollapsibleContent";

interface CollapsibleSectionProps {
  title: string;
  content: string;
  index: number;
}

const CollapsibleSection = memo(({ title, content, index }: CollapsibleSectionProps) => {
  const { isOpen, toggle } = useCollapsibleState(index === 0);

  const formattedContent = useMemo(() => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("### ")) {
        return (
          <h4
            key={i}
            className="text-base font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2"
          >
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3
            key={i}
            className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-5 mb-3"
          >
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.includes("**")) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p
            key={i}
            className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2"
          >
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong
                  key={j}
                  className="font-semibold text-gray-900 dark:text-gray-100"
                >
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={`text-${j}`}>{part}</span>
              )
            )}
          </p>
        );
      }
      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <li
            key={i}
            className="text-sm text-gray-700 dark:text-gray-300 ml-4 mb-1"
          >
            {line.substring(2)}
          </li>
        );
      }
      if (/^\d+\./.test(line)) {
        return (
          <li
            key={i}
            className="text-sm text-gray-700 dark:text-gray-300 ml-4 mb-1"
          >
            {line.substring(line.indexOf(".") + 1).trim()}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      return (
        <p
          key={i}
          className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2"
        >
          {line}
        </p>
      );
    });
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
    >
      <CollapsibleHeader title={title} isOpen={isOpen} onToggle={toggle} />
      <CollapsibleContent isOpen={isOpen}>
        {formattedContent}
      </CollapsibleContent>
    </motion.div>
  );
});

CollapsibleSection.displayName = "CollapsibleSection";

export default CollapsibleSection;