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

Route::get('/expense/time-filter', [ExpenseController::class, 'expenseTimeFilter']);
Route::get('/income/time-filter', [IncomeController::class, 'incomeTimeFilter']);

Route::put('/expense/{id}', [ExpenseController::class, 'update']);
Route::put('/income/{id}', [IncomeController::class, 'update']);

Route::post('/import-expenses', [ExcelImportController::class, 'importExpenses']);
Route::post('/category-budget-rule', [CategoryBudgetRuleController::class, 'store']);
