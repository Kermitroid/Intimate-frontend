export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + "..." : text;
}