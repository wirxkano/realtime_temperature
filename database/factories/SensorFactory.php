<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sensor>
 */
class SensorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'temperature' => 30 + rand(0, 8),
            'humidity' => 80 + rand(0, 5),
            'aqi' => rand(40, 83),
            'light_level' => rand(200, 800)
        ];
    }
}
