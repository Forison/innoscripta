<?php

namespace App\Services;

use App\Models\Article;

class ArticleSearchService
{
    /**
     * Search for articles based on the given filters.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function search(array $filters)
    {
        $query = Article::query();

        if (! empty($filters['keyword'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%'.$filters['keyword'].'%')
                    ->orWhere('content', 'like', '%'.$filters['keyword'].'%')
                    ->orWhere('description', 'like', '%'.$filters['keyword'].'%')
                    ->orWhere('author', 'like', '%'.$filters['keyword'].'%');
            });
        }

        if (! empty($filters['category'])) {
            $query->where('source_id', $filters['category']);
        }

        if (! empty($filters['source_name'])) {
            $query->where('source_name', 'like', '%'.$filters['source_name'].'%');
        }
        if (! empty($filters['publishedAt'])) {
            $query->whereDate('publishedAt', $filters['publishedAt']);
        }

        return $query->get();
    }

    public function personalizedFeed(array $filters)
    {

        $authors = isset($filters['authors']) ? explode(',', $filters['authors']) : [];
        $sources = isset($filters['sources']) ? explode(',', $filters['sources']) : [];

        $authors = array_map('trim', $authors);
        $sources = array_map('trim', $sources);

        $articles = Article::query()
            ->where(function ($query) use ($authors) {
                if (! empty($authors)) {
                    $query->whereIn('author', $authors);
                }
            })
            ->orWhere(function ($query) use ($sources) {
                if (! empty($sources)) {
                    $query->whereIn('source_name', $sources);
                }
            })
            ->get();

        return $articles;
    }
}
