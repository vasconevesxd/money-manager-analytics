<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryExpense extends Model
{
    protected $table = 'categories_expense';

    protected $fillable = [
        'name',
        'color',
        'category_budget_rule_id',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'category_id');
    }

    public function categoryBudgetRule()
    {
        return $this->belongsTo(CategoryBudgetRule::class, 'category_budget_rule_id');
    }

} 