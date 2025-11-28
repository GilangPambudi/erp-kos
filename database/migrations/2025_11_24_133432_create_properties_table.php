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
        Schema::create('properties', function (Blueprint $table) {
            $table->id()->comment('ID unik untuk setiap properti kos.');
            $table->string('name')->comment('Nama kos (e.g., Kos Mawar).');
            $table->text('address')->comment('Alamat lengkap kos.');
            $table->integer('total_capacity')->comment('Jumlah total kamar.');
            $table->decimal('standard_monthly_rate', 10, 2)->comment('Harga standar bulanan saat ini (Dinamis).');
            $table->text('facility_description')->nullable()->comment('Fasilitas kamar standar.');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
