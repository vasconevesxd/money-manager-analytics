<script setup lang="ts">
  // Components
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

  // Types
  import type { Expense } from '@/types/db/index.types';

  // Composables
  import { useAverageExpensesTable } from './composables/useAverageExpenesesTable';

  // Libraries
  import Decimal from 'decimal.js';

  const props = defineProps<{
    expenses: Expense[] | undefined;
  }>();

  const averageExpenses = useAverageExpensesTable(props.expenses ?? []);

  const formatAmount = (amount: number, currency: string): string => {
    return new Decimal(amount)
      .toNumber()
      .toLocaleString('en-US', { style: 'currency', currency: currency });
  };
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Average Expenses</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Budget Rule</TableHead>
            <TableHead>Average Expense</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="expense in averageExpenses" :key="expense.categoryName">
            <TableCell>{{ expense.categoryName }}</TableCell>
            <TableCell>{{ expense.categoryBudgetName }}</TableCell>
            <TableCell>{{ formatAmount(expense.averageAmount, expense.currencyCode) }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
