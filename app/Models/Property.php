<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory;
    use SoftDeletes;

    // Menetapkan nama tabel secara eksplisit (standar Laravel sudah plural)
    protected $table = 'properties';

    // Mendefinisikan kolom yang dapat diisi (fillable)
    protected $fillable = [
        'name',
        'address',
        'total_capacity',
        'standard_monthly_rate',
        'facility_description',
    ];

    /**
     * Relasi: Satu Kos memiliki banyak Kontrak Sewa (LeaseAgreement).
     * @return HasMany
     */
    public function leases(): HasMany
    {
        return $this->hasMany(LeaseAgreement::class, 'property_id', 'property_id');
    }

    /**
     * Relasi: Satu Kos memiliki banyak Data Analisis (AnalyticsData).
     * @return HasMany
     */
    public function analytics(): HasMany
    {
        return $this->hasMany(AnalyticsData::class, 'property_id', 'property_id');
    }
    /**
     * Relasi: Satu Kos memiliki banyak Masa Sewa (Tenancy).
     * @return HasMany
     */
    public function tenancies(): HasMany
    {
        return $this->hasMany(Tenancy::class);
    }

    /**
     * Helper: Ambil tenant yang sedang aktif.
     */
    public function activeTenants()
    {
        return $this->tenancies()->where('status', 'active')->with('tenant');
    }
}
