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

        $colors = [
            '#FF5733', // Red
            '#33FF57', // Green
            '#3357FF', // Blue
            '#FF33A1', // Pink
            '#FFD700', // Gold
        ];

        $categories = [
            'Food & Groceries',
            'Transport',
            'Entertainment',
            'Dining Out',
            'Utilities',
            'Rent/Mortgage',
            'Health & Pharmacy',
            'Insurance',
            'Education',
            'Clothing',
            'Subscriptions',
            'Travel',
            'Gifts & Donations',
            'Household Items',
            'Pets',
            'Debt Payments',
            'Savings & Investments',
            'Childcare',
            'Personal Care',
            'Other',
        ];

        foreach ($categories as $index => $name) {
            CategoryExpense::create([
                'name' => $name,
                'color' => $colors[$index % count($colors)],
            ]);
        }
    }
}
