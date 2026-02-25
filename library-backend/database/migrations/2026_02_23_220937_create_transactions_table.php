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
        Schema::create('transactions', function (Blueprint $table) {
        $table->uuid('id')->primary();

        $table->uuid('book_id');
        $table->uuid('member_id');

        $table->date('issue_date');
        $table->date('due_date');
        $table->date('return_date')->nullable();

        $table->decimal('fine_amount', 8, 2)->nullable();
        $table->integer('renew_count')->default(0);

        $table->enum('status', ['issued', 'returned', 'overdue', 'renewed']);
        $table->enum('sync_status', ['pending', 'synced'])->default('synced');

        $table->timestamps();

        $table->index('book_id');
        $table->index('member_id');
        $table->index('status');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
