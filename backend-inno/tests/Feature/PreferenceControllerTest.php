<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class PreferenceControllerTest extends TestCase
{
  use RefreshDatabase;

  /** @test */
  public function it_returns_distinct_authors_and_sources()
  {
    Article::factory()->create(['author' => 'Author 1', 'source_name' => 'Source A']);
    Article::factory()->create(['author' => 'Author 2', 'source_name' => 'Source B']);
    Article::factory()->create(['author' => 'Author 1', 'source_name' => 'Source A']);
    Article::factory()->create(['author' => 'Author 3', 'source_name' => 'Source C']);

    $response = $this->getJson('/api/v1/preferences');

    $response->assertStatus(200);
  }
  /** @test */
  public function it_stores_preferences_successfully()
  {
    $user = User::factory()->create();
    $this->actingAs($user);

    $data = [
      'source_name' => ['example source'],
      'author' => ['example author'],
    ];

    $response = $this->json('POST', ('api/v1/preferences'), $data);
    $response->assertStatus(201);
  }
}
