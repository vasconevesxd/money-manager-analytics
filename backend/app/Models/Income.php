<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    protected $fillable = [
        'date_time',
        'amount',
        'comment',
        'currency_code',
        'category_id',
        'category_budget_rule_id',
    ];

    protected $casts = [
        'date_time' => 'datetime',
        'amount' => 'double',
    ];

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_code', 'code');
    }

    public function category()
    {
        return $this->belongsTo(CategoryIncome::class, 'category_id');
    }

    public function categoryBudgetRule()
    {
        return $this->belongsTo(CategoryBudgetRule::class, 'category_budget_rule_id');
    }

    public static function fetchWithRelations()
    {
        return self::with(['category', 'categoryBudgetRule']);
    }
} 