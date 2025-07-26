<?php

use App\Http\Controllers\ExcelImportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/import', [ExcelImportController::class, 'import']);
Route::apiResource('category-budget-rule', CategoryBudgetRuleController::class);
Route::apiResource('expense', ExpenseController::class);
Route::apiResource('income', IncomeController::class);
