export type ProcessedRow = {
  key: string | number | undefined;
  value: unknown;
};

export type UseFileUploadOptions = {
  onDataProcessed?: (data: ProcessedRow[][]) => void;
};
