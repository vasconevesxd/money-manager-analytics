<script setup lang="ts">
  // Vue
  import { ref } from 'vue';

  // Components
  import { PencilIcon } from 'lucide-vue-next';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { ScrollArea } from '@/components/ui/scroll-area';

  // Libraries
  import { useDebounceFn } from '@vueuse/core';
  import { toast } from 'vue-sonner';

  // Types
  import type { CategoryBudgetRule } from '../types/index.types';

  // Services
  import { useUpdateCategoryBudgetRule } from '../services/useCategoryBudgetRuleQuery';

  defineProps<{
    categoryBudgetRules: CategoryBudgetRule[] | [];
  }>();

  const { mutate: updateCategoryBudgetRule } = useUpdateCategoryBudgetRule();

  const isDialogOpen = ref(false);

  const editCategoryBudget = async ({ id, name }: CategoryBudgetRule) => {
    const promise = await updateCategoryBudgetRule({
      categoryId: id,
      name: name,
    });

    toast.promise(promise, {
      success: () => 'Category budget updated',
      error: ({ message }: { message: string }) => message,
    });
  };

  // Wrap with debounce, e.g. 300ms delay
  const debouncedEditCategoryBudget = useDebounceFn(editCategoryBudget, 500);
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger>
      <div class="flex items-center justify-end">
        <Button>
          <PencilIcon class="w-4 h-4" />
          Category Budget
        </Button>
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Category Budget</DialogTitle>
        <DialogDescription>
          <p>Edit budget category</p>
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col items-center justify-end py-4">
        <ScrollArea class="h-[200px] w-full pr-4">
          <div
            v-for="category in categoryBudgetRules"
            :key="category.id"
            class="flex flex-col mb-4"
          >
            <Input
              class="focus-visible:ring-0"
              type="text"
              placeholder="e.g: Luxury, Essential etc."
              :defaultValue="category.name"
              @update:model-value="
                debouncedEditCategoryBudget({ id: category.id, name: $event as string })
              "
            />
          </div>
        </ScrollArea>
      </div>
    </DialogContent>
  </Dialog>
</template>
