<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $urls = [
            'http://clients3.google.com/generate_204',
            'http://connectivitycheck.gstatic.com/generate_204',
            'http://captive.apple.com/hotspot-detect.html',
            'https://1.1.1.1',
            'https://dns.google',
        ];

        return [
            'url' => $this->faker->randomElement($urls),
            'name' => $this->faker->domainWord() . " Monitor",
            'check_interval' => 60,
            'user_id' => \App\Models\User::factory(), 
        ];
    }
}