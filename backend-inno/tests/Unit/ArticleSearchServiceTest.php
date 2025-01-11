<?php

namespace Tests\Unit;

use App\Models\Article;
use App\Models\User;
use App\Services\ArticleSearchService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleSearchServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $articleSearchService;

    protected $articles;

    protected function setUp(): void
    {
        parent::setUp();

        $this->articleSearchService = new ArticleSearchService();
        $this->articles = [
            Article::factory()->create([
                'source_id' => 'tech-news',
                'source_name' => 'Tech News',
                'publishedAt' => now()->subDay(),
            ]),
            Article::factory()->create([
                'source_id' => 'health-news',
                'source_name' => 'Health News',
                'publishedAt' => now(),
            ]),
            Article::factory()->create([
                'source_id' => 'sports-news',
                'source_name' => 'Sports News',
                'publishedAt' => now()->addDay(),
            ])
        ];
    }

    /** @test */
    public function it_can_search_articles_by_category()
    {
        $filters = ['category' => 'tech-news'];
        $articles = $this->articleSearchService->search($filters);

        $this->assertCount(1, $articles);
        $this->assertEquals('tech-news', $articles->first()->source_id);
    }

    /** @test */
    public function it_can_search_articles_by_source_name()
    {
        $filters = ['source_name' => 'Tech'];
        $articles = $this->articleSearchService->search($filters);

        $this->assertCount(1, $articles);
        $this->assertStringContainsString('Tech', $articles->first()->source_name);
    }

    /** @test */
    public function it_can_search_articles_by_published_at()
    {
        $publishedAt = now()->subDay();
        $filters = ['publishedAt' => $publishedAt->toDateString()];
        $articles = $this->articleSearchService->search($filters);

        $this->assertCount(1, $articles);
        $this->assertEquals($publishedAt->toDateString(), $articles->first()->publishedAt->toDateString());
    }

    /** @test */
    public function it_returns_empty_when_no_articles_match()
    {
        $filters = ['source_name' => 'wild life'];

        $articles = $this->articleSearchService->search($filters);
        $this->assertCount(0, $articles);
    }

    /** @test */
    public function it_can_fetch_articles_based_on_user_preferences()
    {
        $user = User::factory()->create();
        $user->preferences()->createMany([
            ['source_name' => 'Tech News', 'source_id' => 'tech', 'author' => 'John Doe'],
            ['source_name' => 'Health News', 'source_id' => 'health', 'author' => 'Jane Smith']
        ]);

        $articles = $this->articleSearchService->fetchPersonalizedFeed($user);

        $this->assertCount(2, $articles);
        $this->assertEquals('Tech News', $articles->first()->source_name);
        $this->assertEquals('Health News', $articles->last()->source_name);
    }
}
