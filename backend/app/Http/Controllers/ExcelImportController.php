<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ExpensesImport;
use App\Imports\IncomeImport;
use Maatwebsite\Excel\Validators\ValidationException;
use App\Imports\ExcelImport;

class ExcelImportController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        $file = $request->file('file');

        DB::beginTransaction();

        try {
            Excel::import(new ExcelImport, $file);

            DB::commit();

            return response()->json(['message' => 'Import completed successfully.']);
        } catch (ValidationException $e) {
            DB::rollBack();

            $failures = $e->failures();

            return response()->json([
                'errors' => collect($failures)->map(function ($failure) {
                    return [
                        'row' => $failure->row(),
                        'attribute' => $failure->attribute(),
                        'errors' => $failure->errors(),
                        'values' => $failure->values(),
                    ];
                }),
            ], 422);
            
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Excel import error: ' . $e->getMessage());

            return response()->json(['error' => 'Import failed: ' . $e->getMessage()], 500);
        }
    }
}
