<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\TenancyController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('properties', PropertyController::class);
    Route::get('tenants/search', [TenantController::class, 'search'])->name('tenants.search');
    Route::resource('tenants', TenantController::class);
    Route::get('tenancies/search', [TenancyController::class, 'search'])->name('tenancies.search');
    Route::resource('tenancies', TenancyController::class);
    Route::resource('payments', App\Http\Controllers\PaymentController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
