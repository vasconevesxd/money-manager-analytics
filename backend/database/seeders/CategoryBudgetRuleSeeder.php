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
        CategoryBudgetRule::create([
            'name' => 'Essencial',
        ]);

        CategoryBudgetRule::create([
            'name' => 'Savings',
        ]);

        CategoryBudgetRule::create([
            'name' => 'Wants',
        ]);

    }
}
