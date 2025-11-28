<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\Property;
use App\Models\Tenancy;
use App\Models\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenancyTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenancy_flow()
    {
        // 1. Create Property
        $property = Property::create([
            'name' => 'Test Kos',
            'address' => 'Jl. Test No. 1',
            'total_capacity' => 10,
            'standard_monthly_rate' => 1000000,
        ]);

        // 2. Create Tenant
        $tenant = Tenant::create([
            'full_name' => 'Test Tenant',
            'gender' => 'female',
            'date_of_birth' => '2000-01-01',
            'origin_city' => 'Jakarta',
            'occupation' => 'Student',
        ]);

        // 3. Create Tenancy
        $tenancy = Tenancy::create([
            'tenant_id' => $tenant->id,
            'property_id' => $property->id,
            'start_date' => now(),
            'rent_price' => 900000,
            'status' => 'active',
        ]);

        // 4. Create Payment
        $payment = Payment::create([
            'tenancy_id' => $tenancy->id,
            'amount' => 900000,
            'payment_date' => now(),
            'payment_type' => 'monthly_rent',
        ]);

        // 5. Verify Property -> Active Tenants
        $this->assertTrue($property->activeTenants()->exists());
        $this->assertEquals('Test Tenant', $property->activeTenants->first()->tenant->full_name);

        // 6. Verify Tenant -> Tenancies
        $this->assertTrue($tenant->tenancies()->exists());
        $this->assertEquals(900000, $tenant->tenancies->first()->rent_price);

        // 7. Verify Tenancy -> Payments
        $this->assertTrue($tenancy->payments()->exists());
        $this->assertEquals(900000, $tenancy->payments->first()->amount);
    }
}
