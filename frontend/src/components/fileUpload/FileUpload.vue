<script setup lang="ts">
  import { Upload, X, FileText, ArrowUpFromLine } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
  import { useFileUpload } from './composables/useFileUpload';

  const emit = defineEmits<{
    (e: 'file-imported', file: File | null): void;
    (e: 'upload'): void;
  }>();

  const {
    isDragging,
    importedFile,
    handleFileUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    removeFile,
  } = useFileUpload((file) => emit('file-imported', file));
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-if="!importedFile"
      class="relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all"
      :class="
        isDragging
          ? 'border-primary bg-accent'
          : 'border-border bg-background hover:border-primary hover:bg-muted'
      "
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <div class="flex flex-col items-center gap-4 text-center">
        <Upload
          :size="50"
          class="text-muted-foreground group-hover:text-primary transition-colors"
        />
        <p class="text-lg font-medium text-foreground">Drag and drop your file here</p>
        <span class="text-sm text-muted-foreground">or</span>
        <Button>Browse Files</Button>
        <p class="text-xs text-muted-foreground">Supports: XLSX, XLS, CSV</p>
      </div>
      <input
        type="file"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".xlsx,.xls,.csv"
        @change="handleFileUpload"
      />
    </div>

    <div
      v-else
      class="p-4 border rounded-lg bg-background border-border hover:border-primary hover:bg-muted transition-all"
    >
      <div class="flex items-center gap-4">
        <FileText class="text-primary shrink-0" />
        <div class="flex-grow overflow-hidden">
          <p class="font-medium truncate">{{ importedFile.name }}</p>
          <p class="text-xs text-muted-foreground">
            {{ importedFile.type || 'application/spreadsheet' }}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          class="cursor-pointer hover:border-green-900 hover:text-green-900 hover:bg-green-900/10"
          @click="emit('upload')"
        >
          <ArrowUpFromLine :size="18" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="cursor-pointer hover:border-red-900 hover:text-red-900 hover:bg-red-900/10"
          @click="removeFile"
        >
          <X :size="18" />
        </Button>
      </div>
    </div>
  </div>
</template>
