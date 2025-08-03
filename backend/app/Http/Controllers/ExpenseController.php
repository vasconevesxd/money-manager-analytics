<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Expense;
use Carbon\Carbon;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $expenses = Expense::with(['category', 'categoryBudgetRule'])->get();
        return response()->json($expenses);
    }

    /**
     * Filter expenses by time.
     */
    public function expenseTimeFilter(Request $request)
    {
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);
    

        // Start query with relations (do NOT get yet)
        $query = Expense::fetchWithRelations();
    
        // Apply filters if present
        if ($request->filled('start_date')) {
            $query->whereDate('date_time', '>=', Carbon::parse($request->start_date));
        }
        
        if ($request->filled('end_date')) {
            $query->whereDate('date_time', '<=', Carbon::parse($request->end_date));
        }
    
        // Get the results
        $expenses = $query->get();
    
        // Hide foreign keys from each Expense
        $expenses->each(function ($expense) {
            $expense->makeHidden(['category_id', 'category_budget_rule_id']);
        });
    
        return response()->json($expenses);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->only('category_budget_rule_id'), [
            'category_budget_rule_id' => 'nullable|exists:categories_budget_rule,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $expense = Expense::findOrFail($id);   

        $expense->update($validated); 

        return response()->json(['message' => 'Expense updated', 'expense' => $expense]);
    }

    /**
     * Get summary statistics for expenses.
     */
    public function summary(Request $request)
    {
        $query = Expense::query();
        
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
        
        // Get expenses grouped by category
        $byCategory = Expense::with('category')
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
