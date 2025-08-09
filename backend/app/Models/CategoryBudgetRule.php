<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Expense;
use App\Models\Income;

class CategoryBudgetRule extends Model
{
    protected $table = 'categories_budget_rule';

    protected $fillable = [
        'name',
    ];

    public function expenses()
    {
        return $this->hasMany(CategoryExpense::class, 'category_budget_rule_id');
    }

    public function incomes()
    {
        return $this->hasMany(Income::class, 'category_budget_rule_id');
    }
}
