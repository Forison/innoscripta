<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\ArticleSearchService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    protected $articleSearchService;

    public function __construct(ArticleSearchService $articleSearchService)
    {
        $this->articleSearchService = $articleSearchService;
    }

    use AuthorizesRequests;

    public function index()
    {
        $articles = Article::mostRecent()->get();
        Log::info(get_class($articles));

        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate((new Article)->rules());
        $article = Article::create($validatedData);

        return response()->json($article, 201);
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);

        return response()->json($article);
    }

    public function destroy($id)
    {

        $article = Article::findOrFail($id);
        $this->authorize('destroy', $article);
        $article->delete();

        return response()->json(['message' => 'Article removed'], 200);
    }

    public function search(Request $request)
    {
        $filters = $request->only(['keyword', 'category', 'source_name', 'publishedAt']);
        $articles = $this->articleSearchService->search($filters);

        return response()->json($articles, 200);
    }

    public function getPersonalizedFeed(Request $request)
    {
        $filters = $request->all();
        $articles = $this->articleSearchService->personalizedFeed($filters);

        return response()->json($articles, 200);
    }
}
