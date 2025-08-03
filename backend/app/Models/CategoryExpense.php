<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryExpense extends Model
{
    protected $table = 'categories_expense';

    protected $fillable = [
        'name',
        'color',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'category_id');
    }
} 