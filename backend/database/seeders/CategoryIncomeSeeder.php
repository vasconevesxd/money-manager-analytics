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
        CategoryIncome::create([
            'name' => 'Salary',
        ]);

        CategoryIncome::create([
            'name' => 'Freelance',
        ]);
    }
}
