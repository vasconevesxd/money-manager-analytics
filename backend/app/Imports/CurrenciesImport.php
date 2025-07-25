<?php

namespace App\Imports;

use App\Models\Currency;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class CurrenciesImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {
        return new Currency([
            'code' => $row['code'],
        ]);
    }

    public function rules(): array {
        return [
            '*.code' => ['required', 'string', 'size:3'],
        ];
    }

    public function customValidationMessages() {
        return [
            '*.code.required' => 'Currency code is required.',
        ];
    }
}
