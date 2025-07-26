<?php

namespace App\Http\Controllers;

use App\Models\CategoryBudgetRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryBudgetRuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryBudgetRules = CategoryBudgetRule::all();
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

    /**
     * Display the specified resource.
     */
    public function show(CategoryBudgetRule $categoryBudgetRule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryBudgetRule $categoryBudgetRule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CategoryBudgetRule $categoryBudgetRule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryBudgetRule $categoryBudgetRule)
    {
        //
    }
}
