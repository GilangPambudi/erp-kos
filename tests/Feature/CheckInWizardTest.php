<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckInWizardTest extends TestCase
{
    use RefreshDatabase;

    public function test_check_in_wizard_page_can_be_rendered()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        
        $response = $this->actingAs($user)->get(route('tenancies.create', ['property_id' => $property->id]));

        $response->assertStatus(200);
    }

    public function test_cannot_check_in_tenant_with_active_tenancy()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        $tenant = Tenant::factory()->create();

        // First Check-in
        $this->actingAs($user)->post(route('tenancies.store'), [
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now()->toDateString(),
            'rent_price' => 1000000,
            'pay_initial_rent' => false,
        ]);

        // Second Check-in (Should Fail)
        $response = $this->actingAs($user)->post(route('tenancies.store'), [
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now()->toDateString(),
            'rent_price' => 1000000,
            'pay_initial_rent' => false,
        ]);

        $response->assertSessionHasErrors(['tenant_id']);
    }

    public function test_can_check_in_new_tenant()
    {
        $this->withoutExceptionHandling();
        $user = User::factory()->create();
        $property = Property::factory()->create();

        $response = $this->actingAs($user)->post(route('tenancies.store'), [
            'property_id' => $property->id,
            'full_name' => 'New Tenant',
            'gender' => 'male',
            'date_of_birth' => '1990-01-01',
            'origin_city' => 'Surabaya',
            'occupation' => 'Worker',
            'start_date' => now()->toDateString(),
            'rent_price' => 1000000,
            'pay_initial_rent' => true,
            'payment_amount' => 1000000,
        ]);

        $response->assertRedirect(route('properties.edit', $property->id));
        
        $this->assertDatabaseHas('tenants', ['full_name' => 'New Tenant']);
        $this->assertDatabaseHas('tenancies', ['rent_price' => 1000000]);
        $this->assertDatabaseHas('payments', ['amount' => 1000000]);
    }

    public function test_can_check_in_existing_tenant()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        $tenant = Tenant::factory()->create();

        $response = $this->actingAs($user)->post(route('tenancies.store'), [
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now()->toDateString(),
            'rent_price' => 1000000,
            'pay_initial_rent' => false,
        ]);

        $response->assertRedirect(route('properties.edit', $property->id));
        
        $this->assertDatabaseHas('tenancies', [
            'tenant_id' => $tenant->id,
            'property_id' => $property->id,
        ]);
        $this->assertDatabaseMissing('payments', ['amount' => 1000000]);
    }
}
