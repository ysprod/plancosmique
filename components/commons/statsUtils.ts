export const STAT_COLORS = {
  purple: {
    text: 'text-purple-700',
    border: 'border-purple-100',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
  },
  fuchsia: {
    text: 'text-fuchsia-700',
    border: 'border-fuchsia-100',
    bg: 'bg-fuchsia-50',
    iconBg: 'bg-fuchsia-100',
  },
} as const;

export type StatColor = keyof typeof STAT_COLORS;