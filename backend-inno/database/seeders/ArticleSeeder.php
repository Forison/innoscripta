<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use App\Services\NewsApiService;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder

{
    public function run()
    {
        $newsApiService = new NewsApiService;

        $articles = $newsApiService->fetchTopHeadlines();

        foreach ($articles as $article) {

            // Skip articles that have been marked removed

            if (
                in_array('[Removed]', $article, true) ||
                (isset($article['source']) && in_array('[Removed]', $article['source'], true))
            ) {
                continue;
            }

            $authors = $article['author'] ?? '';
            $authors = explode(',', $authors);

            $userIds = [];

            $articleModel = Article::create([
                'source_id' => $article['source']['id'] ?? 'others',
                'source_name' => $article['source']['name'] ?? '',
                'author' => implode(', ', $authors),
                'title' => $article['title'],
                'description' => $article['description'] ?? 'No description available',
                'url' => $article['url'],
                'urlToImage' => $article['urlToImage'] ?? '',
                'publishedAt' => $article['publishedAt'],
                'content' => $article['content'] ?? 'No content available',
            ]);

            $articleModel->users()->attach($userIds);
        }
    }
}
