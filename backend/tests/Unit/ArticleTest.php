<?php

namespace Tests\Unit;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function article_requires_source_name()
    {
        $articleData = [
            'source_name' => '',
            'author' => 'John Doe',
            'title' => 'Article Title',
            'description' => 'Article description.',
            'content' => 'Article content.',
            'url' => 'https://example.com',
            'publishedAt' => now(),
        ];

        $validator = Validator::make($articleData, (new Article)->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('source_name', $validator->errors()->toArray());
    }

    /** @test */
    public function article_requires_author()
    {
        $articleData = [
            'source_name' => 'Source Name',
            'author' => '',
            'title' => 'Article Title',
            'description' => 'Article description.',
            'content' => 'Article content.',
            'url' => 'https://example.com',
            'publishedAt' => now(),
        ];

        $validator = Validator::make($articleData, (new Article)->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('author', $validator->errors()->toArray());
    }

    /** @test */
    public function article_requires_title()
    {
        $articleData = [
            'source_name' => 'Source Name',
            'author' => 'John Doe',
            'title' => '',
            'description' => 'Article description.',
            'content' => 'Article content.',
            'url' => 'https://example.com',
            'publishedAt' => now(),
        ];

        $validator = Validator::make($articleData, (new Article)->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
    }

    /** @test */
    public function article_requires_description()
    {
        $articleData = [
            'source_name' => 'Source Name',
            'author' => 'John Doe',
            'title' => 'Article Title',
            'description' => '',
            'content' => 'Article content.',
            'url' => 'https://example.com',
            'publishedAt' => now(),
        ];

        $validator = Validator::make($articleData, (new Article)->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('description', $validator->errors()->toArray());
    }

    /** @test */
    public function article_requires_content()
    {
        $articleData = [
            'source_name' => 'Source Name',
            'author' => 'John Doe',
            'title' => 'Article Title',
            'description' => 'Article description.',
            'content' => '',
            'url' => 'https://example.com',
            'publishedAt' => now(),
        ];

        $validator = Validator::make($articleData, (new Article)->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('content', $validator->errors()->toArray());
    }

    /** @test */
    public function article_can_be_created_with_valid_data()
    {
        // Create a user
        $user = User::factory()->create();

        // Prepare article data
        $articleData = [
            'source_id' => '1',
            'source_name' => 'Source Name',
            'author' => 'John Doe',
            'title' => 'Article Title',
            'description' => 'Article description.',
            'content' => 'Article content.',
            'url' => 'https://example.com',
            'urlToImage' => 'https://example.com',
            'publishedAt' => now(),
        ];

        // Create an article and associate it with the user via pivot table
        $article = $user->articles()->create($articleData);

        // Assert that the article was saved correctly
        $this->assertDatabaseHas('articles', ['title' => 'Article Title']);
        $this->assertEquals('Article description.', $article->description);

        // Ensure the article is correctly linked to the user
        $this->assertTrue($user->articles->contains($article));

        // Check the user_id association in the article table (via the pivot table)
        $this->assertEquals($user->id, $article->users()->first()->id);
    }
}
