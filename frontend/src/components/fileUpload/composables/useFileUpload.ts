import { ref } from 'vue';
import type { ProcessedRow } from '@/components/fileUpload/types';

export function useFileUpload(onFileImported?: (file: File | null) => void) {
  const importedFile = ref<File | null>(null);
  const isDragging = ref(false);
  const processedData = ref<ProcessedRow[][]>([]);
  const isProcessing = ref(false);
  const error = ref<string | null>(null);

  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      importedFile.value = file;
      onFileImported?.(file);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    isDragging.value = false;

    const files = event.dataTransfer?.files?.[0];
    if (files) {
      importedFile.value = files;
      onFileImported?.(files);
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.value = true;
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.value = false;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = () => {
    importedFile.value = null;
  };

  return {
    isDragging,
    processedData,
    isProcessing,
    error,
    importedFile,
    handleFileUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeFile,
  };
}
