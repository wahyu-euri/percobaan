<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition()
    {
        return [
            'nama_klien' => $this->faker->company,
            'website' => $this->faker->url,
            'foto' => null,
            'is_active' => $this->faker->boolean(80),
        ];
    }
}
