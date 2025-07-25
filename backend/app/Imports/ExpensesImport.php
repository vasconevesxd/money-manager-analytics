<?php

namespace App\Imports;

use App\Models\Expense;
use App\Models\Currency;
use App\Models\CategoryExpense;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ExpensesImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function headingRow(): int
    {
        return 2; // This tells Excel to treat row 2 as the column names
    }
    
    public function model(array $row)
    {

        $currency = Currency::firstOrCreate(
            ['code' => $row['default_currency']],
        );

        $category = CategoryExpense::firstOrCreate(
            ['name' => $row['category']]
        );

        $dateTime = Date::excelToDateTimeObject($row['date_and_time'])->format('Y-m-d');

        return new Expense([
            'date_time' => $dateTime,
            'amount' => $row['amount_in_default_currency'],
            'currency_code' => $currency->code,
            'category_id' => $category->id,
            'comment' => $row['comment'] ?? null,
        ]);
    }

    public function rules(): array {
        return [
            '*.date_and_time' => 'required|numeric',
            '*.category' => 'required|string',
            '*.amount_in_default_currency' => 'required|numeric',
            '*.default_currency' => 'required|string|size:3',
        ];
    }

    public function customValidationMessages() {
        return [
            '*.date_and_time.required' => 'Date time is required.',
            '*.category.required' => 'Category is required.',
            '*.amount_in_default_currency.required' => 'Amount is required.',
            '*.default_currency.required' => 'Currency is required.',
        ];
    }
}
