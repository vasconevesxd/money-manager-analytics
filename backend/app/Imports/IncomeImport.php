<?php

namespace App\Imports;

use App\Models\Currency;
use App\Models\CategoryIncome;
use App\Models\Income;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class IncomeImport implements ToModel, WithHeadingRow, WithValidation
{
    protected array $usedColors = [];
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
        // Load all used colors once
        if (empty($this->usedColors)) {
            $this->usedColors = CategoryIncome::pluck('color')->toArray();
        }

        $currency = Currency::firstOrCreate(
            ['code' => $row['default_currency']],
        );

        $color = $this->generateUniqueColor();
        $category = CategoryIncome::firstOrCreate(
            ['name' => $row['category']],
            ['color' => $color]
        );

        $this->usedColors[] = $color;

        $dateTime = Date::excelToDateTimeObject($row['date_and_time'])->format('Y-m-d');

        return new Income([
            'date_time' => $dateTime,
            'amount' => $row['amount_in_default_currency'],
            'currency_code' => $currency->code,
            'category_id' => $category->id,
            'comment' => $row['comment'] ?? null,
        ]);
    }

    private function generateUniqueColor(): string
    {
        do {
            $color = $this->hsvToHex(
                mt_rand(0, 359), // Hue: full spectrum
                1,             // Saturation: vivid
                0.85            // Value: bright
            );
        } while (in_array($color, $this->usedColors));
    
        return $color;
    }
    
    private function hsvToHex(float $h, float $s, float $v): string
    {
        $c = $v * $s;
        $x = $c * (1 - abs(fmod($h / 60, 2) - 1));
        $m = $v - $c;
    
        switch (true) {
            case ($h < 60):
                [$r, $g, $b] = [$c, $x, 0];
                break;
            case ($h < 120):
                [$r, $g, $b] = [$x, $c, 0];
                break;
            case ($h < 180):
                [$r, $g, $b] = [0, $c, $x];
                break;
            case ($h < 240):
                [$r, $g, $b] = [0, $x, $c];
                break;
            case ($h < 300):
                [$r, $g, $b] = [$x, 0, $c];
                break;
            default:
                [$r, $g, $b] = [$c, 0, $x];
        }
    
        // Normalize and convert to 0–255 RGB
        $r = round(($r + $m) * 255);
        $g = round(($g + $m) * 255);
        $b = round(($b + $m) * 255);
    
        return sprintf('#%02X%02X%02X', $r, $g, $b);
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
