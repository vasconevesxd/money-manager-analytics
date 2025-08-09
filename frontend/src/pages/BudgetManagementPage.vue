<script setup lang="ts">

  // Components
  import CategoriesCard from '@/features/budgetManagement/categories/CategoriesCard.vue';
  import TableCategories from '@/features/budgetManagement/categories/TableCategories.vue';
  import AddBudget from '@/features/budgetManagement/categories/budget/AddBudget.vue';
  import EditBudget from '@/features/budgetManagement/categories/budget/EditBudget.vue';

  // Services
  import { useCategoryBudgetRuleQuery } from '@/features/budgetManagement/categories/services/useCategoryBudgetRuleQuery';
  import { useCategoryExpensesWithBudgetRuleQuery } from '@/features/budgetManagement/categories/services/useCategoryExpensesWithBudgetRuleQuery';

  const { data: categoryBudgetRules} =
  useCategoryBudgetRuleQuery();

  const {
    data: categoryExpensesWithBudgetRule,
  } = useCategoryExpensesWithBudgetRuleQuery();

</script>

<template>
  <CategoriesCard>
    <div class="flex justify-end gap-4 mb-2">
      <AddBudget />
      <EditBudget v-if="categoryBudgetRules" :categoryBudgetRules="categoryBudgetRules" />
    </div>
    <TableCategories v-if="categoryBudgetRules && categoryExpensesWithBudgetRule" :categoryBudgetRules="categoryBudgetRules" :categoryExpensesWithBudgetRule="categoryExpensesWithBudgetRule" />
  </CategoriesCard>
</template>

<!--<script setup lang="ts">
  import { Separator } from '@/components/ui/separator';
  import { Card, CardHeader, CardContent } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { PlusIcon } from 'lucide-vue-next';
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select';
  import { ref } from 'vue';
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import CardTitle from '@/components/ui/card/CardTitle.vue';
  import { useQuery } from '@tanstack/vue-query';
  import { api } from '@/lib/api';
  import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from '@/components/ui/table';
  import { TwitterPicker } from 'vue-color';
  import { PencilIcon } from 'lucide-vue-next';
  import { ScrollArea } from '@/components/ui/scroll-area';
  // Local state for creating a new category budget
  const newCategoryBudget = ref('');

  interface CategoryExpenseWithBudgetRule {
    id: number;
    name: string;
    color: string;
    category_budget_rule: {
      id: number;
      name: string;
    };
  }

  interface CategoryBudgetRule {
    id: number;
    name: string;
  }

  const {
    data: categoryExpensesWithBudgetRule,
    isLoading: isLoadingCategoryExpensesWithBudgetRule,
    refetch: refetchCategoryExpensesWithBudgetRule,
  } = useQuery<CategoryExpenseWithBudgetRule[]>({
    queryKey: ['category-expense-by-budget-rule'],
    queryFn: () => api.getCategoryExpenseByBudgetRule(),
  });

  const categoryBudgetRulesOptions = ref<CategoryBudgetRule[]>([]);

  const { data: categoryBudgetRules, isLoading: isLoadingCategoryBudgetRules } = useQuery<
    CategoryBudgetRule[] | []
  >({
    queryKey: ['category-budget-rule'],
    queryFn: async () => {
      const response = await api.getCategoryBudgetRule();

      const categoryBudgetRules = response?.map((rule: CategoryBudgetRule) => ({
        id: rule.id,
        name: rule.name,
      })) || [];

      categoryBudgetRulesOptions.value = categoryBudgetRules

      return categoryBudgetRules;
    },
  });

  const updateCategoryBudgetRule = async (categoryId: number, budgetRuleId: number | null) => {
    await api
      .updateCategoryExpense(categoryId, { category_budget_rule_id: budgetRuleId })
      .catch((err) => console.error(err));

    refetchCategoryExpensesWithBudgetRule();
  };

  const isOpenAddCategoryBudget = ref(false);

  const addCategoryBudget = async () => {
    const name = newCategoryBudget.value.trim();
    if (!name) return;
    try {
      const response = await api.createCategoryBudget(name);
      newCategoryBudget.value = '';
      
      categoryBudgetRulesOptions.value.push({
        id: response.id,
        name: name,
      });
      isOpenAddCategoryBudget.value = false;
    } catch (error) {
      console.error(error);
    }
  };

  const updateColor = async (categoryId: number, color: string) => {
    await api.updateCategoryExpense(categoryId, { color }).catch((err) => console.error(err));
    refetchCategoryExpensesWithBudgetRule();
  };

  const selectedCategoryId = ref<number | null>(null);

  const openColorPicker = (categoryId: number) => {
    if (selectedCategoryId.value === categoryId) {
      selectedCategoryId.value = null;
    } else {
      selectedCategoryId.value = categoryId;
    }
  };

  const isOpenEditCategoryBudget = ref(false);

  const editCategoryBudget = async () => {
    await api.updateCategoryBudgetRule(selectedCategory.value?.id as number, { name: selectedCategory.value?.name }).catch((err) => console.error(err));
    isOpenEditCategoryBudget.value = false;
  };

  const selectedCategory = ref<CategoryExpenseWithBudgetRule | null>(null);

</script>

<template>
  <main class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Budget Management</h1>
    </div>
    <Separator />

    <Card>
      <CardHeader>
        <CardTitle class="text-xl">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex justify-end gap-4">
          <Dialog @update:open="isOpenAddCategoryBudget = $event">
            <DialogTrigger>
              <div class="flex items-center justify-end">
                <Button @click="isOpenAddCategoryBudget = true"> <PlusIcon class="w-4 h-4" />Category Budget </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Category Budget</DialogTitle>
                <DialogDescription>
                  <p>Add a new budget category</p>
                </DialogDescription>
                <div class="flex items-center justify-end gap-4 mt-4">
                  <Input
                    v-model="newCategoryBudget"
                    type="text"
                    placeholder="e.g: Luxury, Essential etc."
                  />
                  <Button @click="addCategoryBudget">Add</Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog @update:open="isOpenEditCategoryBudget = $event">
            <DialogTrigger>
              <div class="flex items-center justify-end">
                <Button @click="isOpenEditCategoryBudget = true"> <PencilIcon class="w-4 h-4" />Category Budget </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Category Budget</DialogTitle>
                <DialogDescription>
                  <p>Edit budget category</p>
                </DialogDescription>
                <div class="flex flex-col items-center justify-end py-4">
                  <ScrollArea class="h-[200px] w-full pr-4">
                    <div class="flex flex-col mb-4" v-for="category in categoryExpensesWithBudgetRule" :key="category.id">
                      <Input class="focus-visible:ring-0" v-model="category.name"  type="text" placeholder="e.g: Luxury, Essential etc." />
                    </div>
                  </ScrollArea>
                  <Button @click="editCategoryBudget" class="w-full">Save</Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Table
          v-if="
            categoryExpensesWithBudgetRule &&
            !isLoadingCategoryExpensesWithBudgetRule &&
            !isLoadingCategoryBudgetRules
          "
        >
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Budget Rule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="category in categoryExpensesWithBudgetRule" :key="category.id">
              <TableCell>
                <div class="relative pl-2">
                  <div
                    class="w-4 h-4 rounded-full"
                    :style="{ backgroundColor: category.color }"
                    @click="openColorPicker(category.id)"
                  ></div>

                  <TwitterPicker
                    class="absolute! top-8 left-[-5px] z-999"
                    v-if="selectedCategoryId === category.id"
                    :key="category.id"
                    v-model="category.color"
                    @update:model-value="updateColor(category.id, $event as string)"
                  />
                </div>
              </TableCell>

              <TableCell>{{ category.name }}</TableCell>

              <TableCell>
                <Select
                  v-model="category.category_budget_rule.id"
                  @update:model-value="
                    (val) =>
                      updateCategoryBudgetRule(category.id, val === null ? null : Number(val))
                  "
                >
                  <SelectTrigger>
                    <SelectValue :placeholder="category.category_budget_rule.name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="rule in categoryBudgetRules" :key="rule.id" :value="rule.id">
                      {{ rule.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </main>
</template>
-->
