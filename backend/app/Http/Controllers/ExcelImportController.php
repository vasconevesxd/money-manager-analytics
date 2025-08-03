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
    public function importExpenses(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        $file = $request->file('file');

        DB::beginTransaction();

        try {
            Excel::import(new ExcelImport, $file);

            DB::commit();

            return response()->json([
                'status' => true,
                'status_code' => 202,
                'message' => 'Import completed successfully.',
            ]);
        } catch (ValidationException $e) {
            DB::rollBack();

            $failures = $e->failures();

            return response()->json([
                'errors' => collect($failures)->map(function ($failure) {
                    return [
                        'status' => false,
                        'status_code' => 422,
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

            return response()->json([
                'status' => false,
                'status_code' => 500,
                'message' => 'Import failed: ' . $e->getMessage(),
            ], 500);
        }
    }
}
