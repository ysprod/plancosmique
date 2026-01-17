import { useMemo } from "react";

export interface ParsedSection {
  title: string;
  content: string;
}

export function useMarkdownParser(markdown: string): ParsedSection[] {
  return useMemo(() => {
    const sections = markdown.split("\n## ").filter(Boolean);
    return sections.map((section) => {
      const lines = section.split("\n");
      const title = lines[0].replace(/^#+\s*/, "").replace(/^🌌\s*/, "");
      const content = lines.slice(1).join("\n").trim();
      return { title, content };
    });
  }, [markdown]);
}
