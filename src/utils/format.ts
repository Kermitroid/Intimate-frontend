// src/utils/format.ts

/**
 * Converts seconds to a human-readable duration string.
 * Examples:
 *   3661 -> "1:01:01"
 *   125  -> "2:05"
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

/**
 * Formats large numbers into readable strings (e.g., 1.2K, 3.4M).
 */
export function formatViewCount(count: number): string {
  if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)}B`;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

/**
 * Converts a timestamp to a "time ago" string.
 * Example: "3 minutes ago", "2 weeks ago"
 */
export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}
