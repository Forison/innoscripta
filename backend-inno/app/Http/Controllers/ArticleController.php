<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Services\ArticleSearchService;
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
        $filters = $request->only(['keyword', 'category', 'source_name', 'publishedAt']);
        $articles = $this->articleSearchService->search($filters);
        return response()->json($articles);
    }


    // public function getPersonalizedFeed(Request $request)
    // {
    //     $query = Article::query();
    //     // Retrieve filters from query parameters
    //     $authors = $request->query('authors');
    //     $sources = $request->query('sources');
    //     $authorList = explode(',', $authors);
    //     $sourceList = explode(',', $sources);
    //     foreach ($sourceList as $key => $value) {
    //         $query->where('source_name', $value);
    //     }
    //     foreach ($authorList as $key => $value) {
    //         $query->where('author', $value);
    //     }

    //     Log::info($query->get());
    //     $a = Article::whereIn('author', [$authors])
    //         ->orWhereIn('source_name', [$sources])
    //         ->get();
    //     Log::info($a);

    //     // Return the results as JSON
    //     return response()->json($query->get(), 200);
    // }
}
