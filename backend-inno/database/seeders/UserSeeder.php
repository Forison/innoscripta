<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()->create([
            'email' => 'admin1@newfeed.com',
            'password' => '11111111',
            'role' => 'admin'
        ]);
    }
}
