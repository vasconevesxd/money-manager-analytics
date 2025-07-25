<?php

namespace Database\Seeders;

use App\Models\Income;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Income::create([
            'date_time' => now(),
            'category_id' => 1,
            'amount' => 100,
            'currency_code' => 'USD',
            'comment' => 'Salary',
        ]);

        Income::create([
            'date_time' => now(),
            'category_id' => 2,
            'amount' => 200,
            'currency_code' => 'EUR',
            'comment' => 'Freelance',
        ]);
    }
}
