<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Illuminate\Support\Facades\Log;

class ExcelImport implements WithMultipleSheets, SkipsUnknownSheets
{
    public function sheets(): array
    {
        return [
            'Expenses' => new ExpensesImport(),
            'Income' => new IncomeImport(),
        ];
    }
    
    public function onUnknownSheet($sheetName)
    {
        // Log that a sheet was skipped
        Log::info("Sheet {$sheetName} was skipped during import");
    }
} 