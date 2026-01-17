export type MissionBlock = { 
  type: "h2" | "bullet" | "p" | "spacer"; 
  value: string; 
  key: string 
};

export function parseMissionText(text: string): MissionBlock[] {
  const blocks = (text || "").split("\n").map((l) => l.trimEnd());
  const out: MissionBlock[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const line = blocks[i];
    if (!line.trim()) {
      out.push({ type: "spacer", value: "", key: `sp_${i}` });
      continue;
    }
    if (line.startsWith("##")) {
      out.push({ type: "h2", value: line.replace(/^##\s*/, ""), key: `h2_${i}` });
      continue;
    }
    if (line.startsWith("•")) {
      out.push({ type: "bullet", value: line.replace(/^•\s*/, ""), key: `b_${i}` });
      continue;
    }
    out.push({ type: "p", value: line, key: `p_${i}` });
  }

  return out;
}

export function extractFirstMissionLine(missionText: string): string {
  const lines = missionText.split("\n").map((l: string) => l.trim()).filter(Boolean);
  const head = lines.find((l: string) => l.startsWith("##"))?.replace(/^##\s*/, "");
  return head || lines[0] || "Mission de vie disponible";
}