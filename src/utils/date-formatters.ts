/**
 * Shared date formatting utilities
 * Consolidates duplicate date formatting functions across components
 */

export type DateFormat = 'fa-short' | 'fa-long' | 'en-short' | 'en-long' | 'iso' | 'timestamp';

export interface FormattedDates {
  persian_short: string;
  persian_long: string;
  english_short: string;
  english_long: string;
  iso: string;
  timestamp: number;
}

/**
 * Format a single date according to specified format
 */
export function formatDate(date: Date, format: DateFormat = 'en-short'): string {
  switch (format) {
    case "fa-short":
      return date.toLocaleDateString("fa-IR");
    
    case "fa-long":
      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    
    case "en-short":
      return date.toLocaleDateString("en-US");
    
    case "en-long":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    
    case "iso":
      return date.toISOString();
    
    case "timestamp":
      return date.getTime().toString();
    
    default:
      return date.toLocaleDateString("en-US");
  }
}

/**
 * Get all available formats for a date
 */
export function getAllDateFormats(date: Date): FormattedDates {
  return {
    persian_short: date.toLocaleDateString("fa-IR"),
    persian_long: date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }),
    english_short: date.toLocaleDateString("en-US"),
    english_long: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }),
    iso: date.toISOString(),
    timestamp: date.getTime(),
  };
}

/**
 * Format a date range (from/to dates)
 */
export function formatDateRange(
  from?: Date, 
  to?: Date, 
  format: DateFormat = 'en-short',
  separator: string = ' - '
): string {
  if (!from) return '';
  
  const fromFormatted = formatDate(from, format);
  
  if (!to) return fromFormatted;
  
  const toFormatted = formatDate(to, format);
  return `${fromFormatted}${separator}${toFormatted}`;
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays === -1) return 'yesterday';
  if (diffDays > 0) return `in ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}
