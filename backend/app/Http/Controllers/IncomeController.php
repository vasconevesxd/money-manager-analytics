<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Income;

class IncomeController extends Controller
{
    
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
            $income->makeHidden(['category_id']);
        });
        
        return response()->json($incomes);
    }

}
