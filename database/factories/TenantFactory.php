<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories.Factory<\App\Models\Tenant>
 */
class TenantFactory extends Factory
{
    public function definition(): array
    {
        // Pakai Faker Indonesia
        $faker = \Faker\Factory::create('id_ID');

        return [
            'full_name'      => $faker->name('female'),
            'date_of_birth'  => $faker->dateTimeBetween('1990-01-01', '2005-12-31')->format('Y-m-d'),
            'gender'         => 'female',
            'origin_city'    => $faker->city(),
            'occupation'     => $faker->jobTitle(),
            'workplace_name' => $faker->company(),
            'phone_number'   => '08' . $faker->numerify('##########'),
        ];
    }
}
