<?php

namespace App\Http\Controllers;

use App\Services\ArticleSearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $articleSearchService;

    public function __construct(ArticleSearchService $articleSearchService)
    {
        $this->articleSearchService = $articleSearchService;
    }

    public function currentUser(): JsonResponse
    {
        $user = Auth::user();

        if ($user) {
            return response()->json($user, 200);
        }

        return response()->noContent(404);
    }

    public function myPreference(): JsonResponse
    {
        $user = Auth::user();
        $preferences = $user->preferences;
        Log::info($preferences);

        return response()->json([
            'authors' => $preferences->authors,
            'sources' => $preferences->sources,
        ], 200);
    }
}
