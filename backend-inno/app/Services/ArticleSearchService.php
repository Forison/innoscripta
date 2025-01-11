<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;

class ArticleSearchService
{
  /**
   * Search for articles based on the given filters.
   *
   * @return \Illuminate\Database\Eloquent\Collection
   * 
   */

  public function search(array $filters)
  {
    $query = Article::query();

    // Search by keyword in multiple fields
    if (!empty($filters['keyword'])) {
      $query->where(function ($q) use ($filters) {
        $q->where('title', 'like', '%' . $filters['keyword'] . '%')
          ->orWhere('content', 'like', '%' . $filters['keyword'] . '%')
          ->orWhere('description', 'like', '%' . $filters['keyword'] . '%');
      });
    }

    // Filter by category
    if (!empty($filters['category'])) {
      $query->where('source_id', $filters['category']);
    }

    // Filter by source name
    if (!empty($filters['source_name'])) {
      $query->where('source_name', 'like', '%' . $filters['source_name'] . '%');
    }

    // Filter by exact date
    if (!empty($filters['publishedAt'])) {
      $query->whereDate('publishedAt', $filters['publishedAt']);
    }

    // Filter by date range
    if (!empty($filters['startDate']) && !empty($filters['endDate'])) {
      $query->whereBetween('publishedAt', [$filters['startDate'], $filters['endDate']]);
    }

    return $query->get();
  }


  public function fetchPersonalizedFeed(User $user)
  {
    $preferences = $user->preferences()->get();

    $query = Article::query();

    if ($preferences->isNotEmpty()) {
      foreach ($preferences as $preference) {
        $query->orWhere('source_name', 'like', '%' . $preference->source_name . '%')
          ->orWhere('source_id', $preference->source_id)
          ->orWhere('author', 'like', '%' . $preference->author . '%');
      }
    }

    return $query->get();
  }
}
