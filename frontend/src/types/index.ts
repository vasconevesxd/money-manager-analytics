export const Timeframe = {
  DAY: 'day',
  WEEK: 'week',
  YEAR: 'year',
  CUSTOM: 'custom',
} as const;

export type TimeframeType = (typeof Timeframe)[keyof typeof Timeframe];
