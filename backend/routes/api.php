<?php

use App\Http\Controllers\CategoryBudgetRuleController;
use App\Http\Controllers\ExcelImportController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/category-budget-rule', [CategoryBudgetRuleController::class, 'index']);
Route::get('/expense', [ExpenseController::class, 'index']);
Route::get('/income', [IncomeController::class, 'index']);

Route::put('/expense', [ExpenseController::class, 'update']);
Route::put('/income', [IncomeController::class, 'update']);

Route::post('/import', [ExcelImportController::class, 'import']);
Route::post('/category-budget-rule', [CategoryBudgetRuleController::class, 'store']);

Route::get('/status', function () {
    return response()->json(['message' => 'Hello World']);
});