<?php

namespace Database\Seeders;

use App\Models\Income;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $incomes = [
            [
                'date_time' => Carbon::now()->subDays(3),
                'category_id' => 1, // Salary
                'amount' => 3200.00,
                'currency_code' => 'EUR',
                'comment' => 'Monthly salary from OffX',
                'category_budget_rule_id' => 1,
            ],
            [
                'date_time' => Carbon::now()->subDays(10),
                'category_id' => 2, // Freelance
                'amount' => 850.75,
                'currency_code' => 'USD',
                'comment' => 'Web development freelance project',
                'category_budget_rule_id' => null,
            ],
            [
                'date_time' => Carbon::now()->subDays(20),
                'category_id' => 3, // Investments
                'amount' => 150.30,
                'currency_code' => 'EUR',
                'comment' => 'Dividend from S&P 500 ETF',
                'category_budget_rule_id' => 2,
            ],
            [
                'date_time' => Carbon::now()->subDays(30),
                'category_id' => 4, // Gifts
                'amount' => 200.00,
                'currency_code' => 'EUR',
                'comment' => 'Birthday gift from family',
                'category_budget_rule_id' => null,
            ],
            [
                'date_time' => Carbon::now()->subDays(40),
                'category_id' => 5, // Rental income
                'amount' => 950.00,
                'currency_code' => 'EUR',
                'comment' => 'Rent from apartment',
                'category_budget_rule_id' => 3,
            ],
        ];

        foreach ($incomes as $income) {
            Income::create($income);
        }
    }
}
