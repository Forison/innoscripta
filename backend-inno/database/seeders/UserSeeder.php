<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $email = 'admin@newfeed.com';

        User::firstOrCreate(
            ['email' => $email],
            [
                'password' => '11111111',
                'role' => 'admin',
                'name' => 'Jane Doe',
            ]
        );
    }
}
