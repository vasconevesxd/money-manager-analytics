<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Expense;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::all();
        return response()->json($expenses);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->only('id', 'category_budget_rule_id'), [
            'id' => 'required|exists:expenses,id',
            'category_budget_rule_id' => 'nullable|exists:categories_budget_rule,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $expense = Expense::findOrFail($validated['id']);   

        unset($validated['id']);

        $expense->update($validated); 

        return response()->json(['message' => 'Expense updated', 'expense' => $expense]);
    }

}
