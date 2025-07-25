<?php

namespace Database\Seeders;

use App\Models\CategoryExpense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CategoryExpense::create([
            'name' => 'Food',
        ]);

        CategoryExpense::create([
            'name' => 'Transport',
        ]);

        CategoryExpense::create([
            'name' => 'Entertainment',
        ]);
    }
}
