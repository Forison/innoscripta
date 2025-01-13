<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsApiService
{
    public function fetchTopHeadlines()
    {
        // These are left to enable you test easily 
        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'country' => 'us',
            'apiKey' => '12cc86ed3091422fbfada82964f7c186',
        ]);

        return $response->json()['articles'];
    }
}
