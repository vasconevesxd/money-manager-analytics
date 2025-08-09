import dayjs from 'dayjs';

/**
 * Returns an array of years from a given start year to the current year.
 * @param startYear The starting year (e.g., 1990)
 * @returns Array of years as numbers
 */
export function getYearRange(startYear: number): number[] {
  const currentYear = dayjs().year();

  if (startYear > currentYear) {
    return [];
  }

  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
}
