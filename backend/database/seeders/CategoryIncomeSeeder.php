<?php

namespace Database\Seeders;

use App\Models\CategoryIncome;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryIncomeSeeder extends Seeder
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
            'Salary',
            'Freelance',
            'Dividends',
            'Investments',
            'Gifts',
            'Rental Income',
            'Royalties',
            'Refunds',
            'Bonuses',
            'Other',
        ];

        foreach ($categories as $index => $name) {
            CategoryIncome::create([
                'name' => $name,
                'color' => $colors[$index % count($colors)],
            ]);
        }
    }
}
