<?php

namespace Database\Seeders;

use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::create([
            'date_time' => now(),
            'category_id' => 1,
            'amount' => 100,
            'currency_code' => 'USD',
            'comment' => 'Food',
        ]);

        Expense::create([
            'date_time' => now(),
            'category_id' => 2,
            'amount' => 200,
            'currency_code' => 'EUR',
            'comment' => 'Transport',
        ]);
    }
}
