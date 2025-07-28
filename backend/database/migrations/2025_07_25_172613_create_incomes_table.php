<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_time');
            $table->double('amount');
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->string('currency_code');
            $table->foreign('currency_code')->references('code')->on('currencies');
            $table->foreignId('category_id')->constrained('categories_income');
            $table->foreignId('category_budget_rule_id')->nullable()->constrained('categories_budget_rule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};
