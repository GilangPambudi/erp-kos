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
        Schema::create('tenancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('tenants')->onDelete('cascade');
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');
            $table->string('room_number')->nullable()->comment('Nomor kamar (opsional).');
            $table->date('start_date')->comment('Tanggal mulai sewa.');
            $table->date('end_date')->nullable()->comment('Tanggal berakhir sewa (jika ada).');
            $table->decimal('rent_price', 10, 2)->comment('Harga sewa yang disepakati.');
            $table->enum('status', ['active', 'finished', 'cancelled'])->default('active')->comment('Status masa sewa.');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenancies');
    }
};
