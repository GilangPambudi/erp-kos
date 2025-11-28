<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Kos',
            'address' => $this->faker->address,
            'total_capacity' => $this->faker->numberBetween(5, 20),
            'standard_monthly_rate' => $this->faker->numberBetween(500000, 2000000),
            'facility_description' => $this->faker->sentence,
        ];
    }
}
