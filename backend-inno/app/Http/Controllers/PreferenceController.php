<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferenceController extends Controller
{
    public function getPreferences()
    {
        $authors = Article::distinct()->pluck('author')->filter()->values();
        $sources = Article::distinct()->pluck('source_name')->filter()->values();

        return response()->json([
            'preference' => [
                'authors' => $authors,
                'sources' => $sources,
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $sources = $request->input('sources', []);
        $authors = $request->input('authors', []);
        $preference = $user->preferences;
        $preference->sources = $sources;
        $preference->authors = $authors;
        $preference->save();
    }
}
