<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Client;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => '12345678',
            'foto' => 'coba.JPG',
            'status' => 'aktif'
        ]);

        \App\Models\Client::factory()->create([
            'nama_klien' => 'Banima Tech',
            'website' => 'https://banimatech.com',
            'foto' => null,
            'is_active' => true
        ]);
    }
}
