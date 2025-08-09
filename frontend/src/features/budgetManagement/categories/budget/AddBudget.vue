<script setup lang="ts">
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
  import { PlusIcon } from 'lucide-vue-next';
  import { ref } from 'vue';
  import type { CategoryBudgetRule } from '../types/index.types';
  import { useCreateCategoryBudgetRule } from '../services/useCategoryBudgetRuleQuery';
  import { toast } from 'vue-sonner';

  const { mutate: createCategoryBudgetRule } = useCreateCategoryBudgetRule();

  const isDialogOpen = ref(false);

  const categoryBudgetRulesOptions = ref<CategoryBudgetRule[]>([]);
  const newCategoryBudget = ref('');

  const addCategoryBudget = async () => {
    const name = newCategoryBudget.value.trim();

    if (!name) return;

    try {
      const promise = await createCategoryBudgetRule({ name });

      toast.promise(promise, {
        success: () => 'Created budget category',
        error: ({ message }: { message: string }) => message,
      });

      newCategoryBudget.value = '';

      categoryBudgetRulesOptions.value.push({
        id: promise.id,
        name: name,
      });
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger>
      <div class="flex items-center justify-end">
        <Button>
          <PlusIcon class="w-4 h-4" />
          Category Budget
        </Button>
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Category Budget</DialogTitle>
        <DialogDescription>
          <p>Create a new budget category</p>
        </DialogDescription>
        <div class="flex items-center justify-end gap-4 mt-4">
          <Input
            v-model="newCategoryBudget"
            type="text"
            placeholder="e.g: Luxury, Essential etc."
          />
          <Button @click="addCategoryBudget">Create</Button>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
