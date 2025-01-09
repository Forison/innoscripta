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
            $authors = $article['author'] ?? 'Unknown';
            $authors = explode(',', $authors);

            $userIds = [];

            foreach ($authors as $authorName) {
                $authorName = trim($authorName);

                $baseEmail = strtolower(str_replace(' ', '.', $authorName)) . '@example.com';

                $email = $baseEmail;
                $counter = 1;

                while (User::where('email', $email)->exists()) {
                    $email = strtolower(str_replace(' ', '.', $authorName)) . $counter . '@example.com';
                    $counter++;
                }

                $user = User::firstOrCreate(
                    ['name' => $authorName],
                    ['email' => $email, 'password' => bcrypt('password123')]
                );

                $userIds[] = $user->id;
            }

            // Create the article and assign the user_ids
            $articleModel = Article::create([
                'source_id' => $article['source']['id'] ?? 'others',
                'source_name' => $article['source']['name'] ?? null,
                'author' => implode(', ', $authors),
                'title' => $article['title'],
                'description' => $article['description'] ?? 'No description available',
                'url' => $article['url'],
                'urlToImage' => $article['urlToImage'] ?? null,
                'publishedAt' => $article['publishedAt'],
                'content' => $article['content'] ?? 'No content available',
            ]);

            // Attach the users to the article using the pivot table
            $articleModel->users()->attach($userIds);
        }
    }
}
