<?php

namespace Database\Seeders;

use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $expenses = [
            [
                'date_time' => Carbon::now()->subDays(2),
                'category_id' => 1, // Food
                'amount' => 23.50,
                'currency_code' => 'EUR',
                'comment' => 'Groceries from Lidl',
            ],
            [
                'date_time' => Carbon::now()->subDays(4),
                'category_id' => 2, // Transport
                'amount' => 15.00,
                'currency_code' => 'EUR',
                'comment' => 'Uber to work',
            ],
            [
                'date_time' => Carbon::now()->subDays(7),
                'category_id' => 3, // Entertainment
                'amount' => 49.99,
                'currency_code' => 'USD',
                'comment' => 'Spotify and Netflix subscription',
            ],
            [
                'date_time' => Carbon::now()->subDays(10),
                'category_id' => 4, // Utilities
                'amount' => 78.20,
                'currency_code' => 'EUR',
                'comment' => 'Electricity bill',
            ],
            [
                'date_time' => Carbon::now()->subDays(12),
                'category_id' => 5, // Health
                'amount' => 32.00,
                'currency_code' => 'EUR',
                'comment' => 'Pharmacy - flu medicine',
            ],
            [
                'date_time' => Carbon::now()->subDays(15),
                'category_id' => 6, // Dining out
                'amount' => 64.75,
                'currency_code' => 'EUR',
                'comment' => 'Dinner with friends at Italian restaurant',
            ],
        ];

        foreach ($expenses as $expense) {
            Expense::create($expense);
        }
    }
}
