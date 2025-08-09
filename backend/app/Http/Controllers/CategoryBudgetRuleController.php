<?php

namespace App\Http\Controllers;

use App\Models\CategoryBudgetRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryBudgetRuleController extends Controller
{
    public function getAllCategoryBudgetRule()
    {
        $categoryBudgetRules = CategoryBudgetRule::all();
        $categoryBudgetRules->makeHidden(['created_at', 'updated_at']);
        return response()->json($categoryBudgetRules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories_budget_rule,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $categoryBudgetRule = CategoryBudgetRule::create($request->all());

        return response()->json($categoryBudgetRule);
    }

    public function update(Request $request, int $id)
    {
        $categoryBudgetRule = CategoryBudgetRule::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|unique:categories_budget_rule,name',
        ]);

        $categoryBudgetRule->update($validated);
        $categoryBudgetRule->makeHidden(['created_at', 'updated_at']);

        return response()->json($categoryBudgetRule);
    }
}
