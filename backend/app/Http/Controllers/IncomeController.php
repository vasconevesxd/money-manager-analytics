<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Income;

class IncomeController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $incomes = Income::with(['category', 'categoryBudgetRule'])->get();
        return response()->json($incomes);
    }
    
    /**
     * Filter incomes by time.
     */
    public function incomeTimeFilter(Request $request)
    {
        $query = Income::fetchWithRelations();
        
        // Filter by start date if provided
        if ($request->has('start_date')) {
            $query->whereDate('date_time', '>=', $request->start_date);
        }
        
        // Filter by end date if provided
        if ($request->has('end_date')) {
            $query->whereDate('date_time', '<=', $request->end_date);
        }
        
        $incomes = $query->get();

        // Hide foreign keys from each Income
        $incomes->each(function ($income) {
            $income->makeHidden(['category_id', 'category_budget_rule_id']);
        });
        
        return response()->json($incomes);
    }

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

    /**
     * Get summary statistics for income.
     */
    public function summary(Request $request)
    {
        $query = Income::query();
        
        // Filter by start date if provided
        if ($request->has('start_date')) {
            $query->whereDate('date_time', '>=', $request->start_date);
        }
        
        // Filter by end date if provided
        if ($request->has('end_date')) {
            $query->whereDate('date_time', '<=', $request->end_date);
        }
        
        $total = $query->sum('amount');
        $count = $query->count();
        
        // Get income grouped by category
        $byCategory = Income::with('category')
            ->select('category_id')
            ->selectRaw('SUM(amount) as total')
            ->when($request->has('start_date'), function($q) use ($request) {
                return $q->whereDate('date_time', '>=', $request->start_date);
            })
            ->when($request->has('end_date'), function($q) use ($request) {
                return $q->whereDate('date_time', '<=', $request->end_date);
            })
            ->groupBy('category_id')
            ->get();
        
        return response()->json([
            'total' => $total,
            'count' => $count,
            'by_category' => $byCategory
        ]);
    }
}
