<?php

use App\Http\Controllers\CategoryBudgetRuleController;
use App\Http\Controllers\CategoryExpenseController;
use App\Http\Controllers\ExcelImportController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/category-expense-by-budget-rule', [CategoryExpenseController::class, 'getAllExpensesByBudgetRule']);
Route::get('/category-budget-rule', [CategoryBudgetRuleController::class, 'getAllCategoryBudgetRule']);

Route::get('/expense/time-filter', [ExpenseController::class, 'expenseTimeFilter']);
Route::get('/income/time-filter', [IncomeController::class, 'incomeTimeFilter']);

Route::post('/import-expenses', [ExcelImportController::class, 'importExpenses']);
Route::post('/category-budget-rule', [CategoryBudgetRuleController::class, 'store']);
Route::patch('/category-expense/{id}', [CategoryExpenseController::class, 'update']);
Route::patch('/category-budget-rule/{id}', [CategoryBudgetRuleController::class, 'update']);
