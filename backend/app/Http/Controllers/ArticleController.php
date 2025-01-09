<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Services\ArticleSearchService;

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
        $articles = Article::all();

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

    public function update(Request $request, $id)
    {

        $validatedData = $request->validate((new Article)->rules());
        $article = Article::findOrFail($id);
        $this->authorize('update', $article);
        $article->update($validatedData);

        return response()->json($article, 200);
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
        $filters = $request->only(['source_id', 'source_name', 'publishedAt']);
        $articles = $this->articleSearchService->search($filters);

        return response()->json($articles);
    }

    public function fetchPersonalizedFeed(Request $request)
    {
        $user = $request->user();

        $articles = $this->articleSearchService->fetchPersonalizedFeed($user);
        return response()->json($articles);
    }
}
