<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'currencies';
    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'currency_code', 'code');
    }

    public function incomes()
    {
        return $this->hasMany(Income::class, 'currency_code', 'code');
    }
} 