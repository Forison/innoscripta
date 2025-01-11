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

    if (!empty($filters['keyword'])) {
      $query->where(function ($q) use ($filters) {
        $q->where('title', 'like', '%' . $filters['keyword'] . '%')
          ->orWhere('content', 'like', '%' . $filters['keyword'] . '%')
          ->orWhere('description', 'like', '%' . $filters['keyword'] . '%')
          ->orWhere('author', 'like', '%' . $filters['keyword'] . '%');
      });
    }

    if (!empty($filters['category'])) {
      $query->where('source_id', $filters['category']);
    }

    if (!empty($filters['source_name'])) {
      $query->where('source_name', 'like', '%' . $filters['source_name'] . '%');
    }
    if (!empty($filters['publishedAt'])) {
      $query->whereDate('publishedAt', $filters['publishedAt']);
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
