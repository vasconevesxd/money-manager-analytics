<script setup lang="ts">
  import { Separator } from '@/components/ui/separator';
  import FileUpload from '@/components/fileUpload/FileUpload.vue';
  import { api } from '@/lib/api';
  import { toast } from 'vue-sonner';
  import { ref } from 'vue';

  const fileImportedExpenses = ref<File | null>(null);

  const handleFileImported = async (file: File | null) => {
    fileImportedExpenses.value = file;
  };

  const handleImportExpenses = async () => {
    if (!fileImportedExpenses.value) return;

    const promise = () => api.importExpenses(fileImportedExpenses.value);

    toast.promise(promise, {
      loading: 'Loading...',
      success: ({ message }: { message: string }) => message,
      error: ({ message }: { message: string }) => message,
    });
  };
</script>

<template>
  <main class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Import</h1>
    </div>

    <Separator />
    <FileUpload @file-imported="handleFileImported" @upload="handleImportExpenses" />
  </main>
</template>
