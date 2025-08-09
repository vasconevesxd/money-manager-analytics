<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Expense;
use Carbon\Carbon;

class ExpenseController extends Controller
{

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
            $expense->makeHidden(['category_id']);
        });
    
        return response()->json($expenses);
    }
 
}
