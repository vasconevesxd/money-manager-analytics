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
        Schema::create('categories_expense', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->notNull();
            $table->string('color')->nullable();
            $table->foreignId('category_budget_rule_id')->nullable()->constrained('categories_budget_rule');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories_expense');
    }
};
