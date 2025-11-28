<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Models\Tenancy;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PropertyEditTest extends TestCase
{
    use RefreshDatabase;

    public function test_property_edit_page_can_be_rendered()
    {
        $user = User::factory()->create();
        $property = Property::factory()->create();

        $response = $this->actingAs($user)->get(route('properties.edit', $property->id));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('properties/edit')
            ->has('property', fn (Assert $page) => $page
                ->where('id', $property->id)
                ->where('name', $property->name)
                ->has('tenancies')
                ->etc()
            )
        );
    }

    public function test_property_edit_page_displays_active_tenants()
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

        $response = $this->actingAs($user)->get(route('properties.edit', $property->id));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('properties/edit')
            ->has('property.tenancies', 1)
            ->where('property.tenancies.0.id', $tenancy->id)
            ->where('property.tenancies.0.tenant.full_name', $tenant->full_name)
        );
    }
}
