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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenancy_id')->constrained('tenancies')->onDelete('cascade');
            $table->decimal('amount', 10, 2)->comment('Jumlah pembayaran.');
            $table->date('payment_date')->comment('Tanggal pembayaran.');
            $table->enum('payment_type', ['monthly_rent', 'deposit', 'other'])->default('monthly_rent')->comment('Jenis pembayaran.');
            $table->text('notes')->nullable()->comment('Catatan tambahan.');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
