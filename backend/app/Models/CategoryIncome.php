<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryIncome extends Model
{
    protected $table = 'categories_income';

    protected $fillable = [
        'name',
    ];

    public function incomes()
    {
        return $this->hasMany(Income::class, 'category_id');
    }
} 