<?php

use App\Http\Controllers\ExcelImportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/status', function () {
    return response()->json(['status' => 'API is working!']);
});

Route::post('/import', [ExcelImportController::class, 'import']);