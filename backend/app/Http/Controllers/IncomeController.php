<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Income;

class IncomeController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->only('id', 'category_budget_rule_id'), [
            'id' => 'required|exists:incomes,id',
            'category_budget_rule_id' => 'nullable|exists:categories_budget_rule,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $income = Income::findOrFail($validated['id']);   

        unset($validated['id']);

        $income->update($validated); 

        return response()->json(['message' => 'Income updated', 'income' => $income]);
    }

}
