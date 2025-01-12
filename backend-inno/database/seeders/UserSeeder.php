<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@newfeed.com'],
            [
                'password' => bcrypt('11111111'),
                'role' => 'admin'
            ]
        );
    }
}
