// Utility to concatenate class names conditionally (like clsx/twMerge)
export function cn(...args: any[]): string {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ');
}
