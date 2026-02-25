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
        Schema::create('reservations', function (Blueprint $table) {
        $table->uuid('id')->primary();

        $table->uuid('book_id');
        $table->uuid('member_id');

        $table->date('reservation_date');

        $table->enum('status', ['waiting', 'notified', 'completed']);
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
        Schema::dropIfExists('reservations');
    }
};
