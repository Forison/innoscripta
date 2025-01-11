<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition()
    {
        return [
            'source_id' => $this->faker->word,
            'source_name' => $this->faker->company,
            'author' => $this->faker->name,
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'url' => $this->faker->url,
            'urlToImage' => $this->faker->imageUrl,
            'publishedAt' => $this->faker->dateTimeThisYear,
            'content' => $this->faker->text,
        ];
    }
}
