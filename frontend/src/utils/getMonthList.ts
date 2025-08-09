import dayjs from 'dayjs';

/**
 * Returns an array of month names.
 * @returns Array of month names or numbers
 */
export function getMonthList(): string[] {
  return Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
}
