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
        Schema::create('members', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('firstName');
            $table->string('lastName');
            $table->string('email')->unique();
            $table->string('phone');

            $table->enum('role', ['Student', 'Teacher', 'Staff']);
            $table->string('department')->nullable();

            $table->date('joinedDate');
            $table->enum('status', ['Active', 'Inactive', 'Suspended']);

            // 🔥 Offline Sync Fields
            $table->bigInteger('createdAt');
            $table->bigInteger('updatedAt');
            $table->enum('syncStatus', ['pending', 'synced'])->default('synced');
            $table->boolean('isDeleted')->default(false);

            $table->timestamps(); // Laravel timestamps
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
