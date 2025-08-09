<?php

namespace App\Http\Controllers;

use App\Models\CategoryExpense;
use Illuminate\Http\Request;

class CategoryExpenseController extends Controller
{

    public function getAllExpensesByBudgetRule()
    {
        $categories = CategoryExpense::with('categoryBudgetRule')
        ->get()
        ->makeHidden(['category_budget_rule_id', 'created_at', 'updated_at']);

        $categories->each(function ($category) {
            if ($category->categoryBudgetRule) {
                $category->categoryBudgetRule->makeHidden(['created_at', 'updated_at']);
            }
        });
    
    return response()->json($categories);
    }

    public function update(Request $request, int $id)
    {
        $category = CategoryExpense::findOrFail($id);

        $validated = $request->validate([
            'color' => 'nullable|string',
            'category_budget_rule_id' => 'nullable|exists:categories_budget_rule,id',
        ]);

        $category->update($validated);

        // Return with relation for frontend convenience
        $category->load('categoryBudgetRule');
        $category->makeHidden(['category_budget_rule_id', 'created_at', 'updated_at']);
        if ($category->categoryBudgetRule) {
            $category->categoryBudgetRule->makeHidden(['created_at', 'updated_at']);
        }

        return response()->json($category);
    }

}
