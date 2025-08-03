<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CategoryBudgetRule;

class CategoryBudgetRuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        $rules = [
            'Essential Needs',      // Rent, food, transport, bills
            'Savings & Investments',// Emergency fund, retirement, investing
            'Wants & Lifestyle',    // Dining out, entertainment, travel
            'Debt Repayment',       // Credit card, loans
            'Charity & Donations',  // Tithes, causes
        ];

        foreach ($rules as $rule) {
            CategoryBudgetRule::create([
                'name' => $rule,
            ]);
        }

    }
}
