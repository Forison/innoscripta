<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_articles()
    {
        Article::factory()->count(3)->create();
        $response = $this->getJson('/api/v1/articles');
        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    public function test_store_creates_article()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $data = [
            'source_id' => null,
            'source_name' => 'Test Source',
            'author' => 'John Doe',
            'title' => 'Test Article',
            'description' => 'This is a test article description.',
            'url' => 'https://example.com/test-article',
            'urlToImage' => 'https://example.com/image.jpg',
            'publishedAt' => now()->toISOString(),
            'content' => 'This is a test article content.',
        ];

        $response = $this->postJson('/api/v1/articles', $data);
        $response->assertStatus(201);

        $this->assertDatabaseHas('articles', [
            'title' => 'Test Article',
            'author' => 'John Doe',
            'url' => 'https://example.com/test-article',
        ]);
    }

    public function test_show_returns_article()
    {
        $article = Article::factory()->create();
        $response = $this->getJson('/api/v1/articles/'.$article->id);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $article->id,
            'title' => $article->title,
            'content' => $article->content,
        ]);
    }

    public function test_update_allows_admin_to_update_article()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $article = Article::factory()->create();

        $updatedData = [
            'source_id' => null,
            'source_name' => 'Updated Source',
            'author' => 'Jane Doe',
            'title' => 'Updated Title',
            'description' => 'Updated description of the article.',
            'url' => 'https://example.com/updated-article',
            'urlToImage' => 'https://example.com/updated-image.jpg',
            'publishedAt' => now()->format('Y-m-d H:i:s'),
            'content' => 'Updated content of the article.',
        ];

        $response = $this->putJson('/api/v1/articles/'.$article->id, $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('articles', $updatedData);
    }

    public function test_update_prevents_non_admin_from_updating_article()
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user, 'sanctum');

        $article = Article::factory()->create();

        $updatedData = [
            'source_id' => null,
            'source_name' => 'Updated Source',
            'author' => 'Jane Doe',
            'title' => 'Updated Title',
            'description' => 'Updated description of the article.',
            'url' => 'https://example.com/updated-article',
            'urlToImage' => 'https://example.com/updated-image.jpg',
            'publishedAt' => now()->format('Y-m-d H:i:s'),
            'content' => 'Updated content of the article.',
        ];

        $response = $this->putJson('/api/v1/articles/'.$article->id, $updatedData);

        $response->assertStatus(403); // Forbidden, since the user isn't an admin
    }

    public function test_destroy_allows_admin_to_delete_article()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $article = Article::factory()->create();

        if ($user->isAdmin()) {
            $response = $this->deleteJson('/api/v1/articles/'.$article->id);
            $response->assertStatus(200);
            $this->assertDatabaseMissing('articles', ['id' => $article->id]);
        } else {
            $response = $this->deleteJson('/api/v1/articles/'.$article->id);
            $response->assertStatus(403);
        }
    }

    public function test_destroy_prevents_non_admin_from_deleting_article()
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user, 'sanctum');

        $article = Article::factory()->create();

        $response = $this->deleteJson('/api/v1/articles/'.$article->id);
        $response->assertStatus(403);
    }
}
