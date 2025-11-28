<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\Property;
use App\Models\Tenancy;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TenancyEditTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenancy_edit_page_can_be_rendered()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        $tenant = Tenant::factory()->create();
        $tenancy = Tenancy::create([
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now(),
            'rent_price' => 1000000,
            'status' => 'active',
        ]);

        $response = $this->actingAs($user)->get(route('tenancies.edit', $tenancy->id));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('tenancies/edit')
            ->has('tenancy', fn (Assert $page) => $page
                ->where('id', $tenancy->id)
                ->where('rent_price', '1000000.00')
                ->has('tenant')
                ->has('property')
                ->has('payments')
                ->etc()
            )
        );
    }

    public function test_tenancy_edit_page_displays_payment_history()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        $tenant = Tenant::factory()->create();
        $tenancy = Tenancy::create([
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now(),
            'rent_price' => 1000000,
            'status' => 'active',
        ]);

        $payment = Payment::create([
            'tenancy_id' => $tenancy->id,
            'amount' => 1000000,
            'payment_date' => now(),
            'payment_type' => 'monthly_rent',
        ]);

        $response = $this->actingAs($user)->get(route('tenancies.edit', $tenancy->id));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('tenancies/edit')
            ->has('tenancy.payments', 1)
            ->where('tenancy.payments.0.id', $payment->id)
            ->where('tenancy.payments.0.amount', '1000000.00')
        );
    }
    public function test_tenancy_can_be_updated_finished()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        $tenant = Tenant::factory()->create();
        $tenancy = Tenancy::create([
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now(),
            'rent_price' => 1000000,
            'status' => 'active',
        ]);

        // Update with end_date -> should be finished
        $response = $this->actingAs($user)->put(route('tenancies.update', $tenancy->id), [
            'start_date' => '2023-01-01',
            'end_date' => '2023-12-31',
            'rent_price' => 1500000,
            // status is not sent
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('tenancies.edit', $tenancy->id));
        $response->assertSessionHas('success', 'Tenancy updated successfully!');

        $this->assertDatabaseHas('tenancies', [
            'id' => $tenancy->id,
            'rent_price' => 1500000,
            'status' => 'finished',
        ]);
    }

    public function test_tenancy_can_be_updated_active()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();
        $tenant = Tenant::factory()->create();
        $tenancy = Tenancy::create([
            'property_id' => $property->id,
            'tenant_id' => $tenant->id,
            'start_date' => now(),
            'rent_price' => 1000000,
            'status' => 'finished', // Start as finished
        ]);

        // Update without end_date -> should be active
        $response = $this->actingAs($user)->put(route('tenancies.update', $tenancy->id), [
            'start_date' => '2023-01-01',
            'end_date' => null,
            'rent_price' => 1500000,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('tenancies.edit', $tenancy->id));

        $this->assertDatabaseHas('tenancies', [
            'id' => $tenancy->id,
            'rent_price' => 1500000,
            'status' => 'active',
        ]);
    }
}
