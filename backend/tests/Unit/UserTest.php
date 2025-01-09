<?php

namespace Tests\Unit;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_be_created()
    {
        $user = User::factory()->create();

        // Assert the user is created
        $this->assertDatabaseHas('users', [
            'email' => $user->email,
        ]);
    }

    /** @test */
    public function a_user_requires_a_name_email_and_password()
    {
        // Test missing name
        $userData = [
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        $validator = Validator::make($userData, User::rules());
        $this->assertTrue($validator->fails());

        // Test missing email
        $userData = [
            'name' => 'John Doe',
            'password' => 'password123',
        ];

        $validator = Validator::make($userData, User::rules());
        $this->assertTrue($validator->fails());

        // Test missing password
        $userData = [
            'name' => 'John Doe',
            'email' => 'test@example.com',
        ];

        $validator = Validator::make($userData, User::rules());
        $this->assertTrue($validator->fails());
    }

    /** @test */
    public function a_user_has_many_articles()
    {
        // Create a user using the factory
        $user = User::factory()->create();

        // Create an article
        $article = Article::factory()->create();

        // Attach the article to the user using the pivot table
        $user->articles()->attach($article->id);

        // Assert that the user has the article
        $this->assertTrue($user->articles->contains($article));
    }

    /** @test */
    public function a_user_email_must_be_unique()
    {
        // Create a user with a unique email
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
        ]);

        // Test that attempting to create a second user with the same email should fail
        $this->expectException(\Illuminate\Database\QueryException::class);

        User::create([
            'name' => 'Jane Doe',
            'email' => 'john@example.com',
            'password' => 'password456',
        ]);
    }
}
