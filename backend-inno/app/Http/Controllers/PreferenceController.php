<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Preference;
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
            ]
        ], 200);
    }

    public function store(Request $request)
    {

        $user = Auth::user();
        $sources = $request->input('sources', []);
        $authors = $request->input('authors', []);

        $preference = $user->preferences;

        if ($preference) {
            $preference->update([
                'sources' => $sources,
                'authors' => $authors,
            ]);

            return response()->json([
                'message' => 'Preference updated successfully.',
                'preference' => $preference,
            ], 200);
        } else {
            $newPreference = Preference::create([
                'user_id' => $user->id,
                'sources' => $sources,
                'authors' => $authors,
            ]);

            return response()->json([
                'message' => 'Preference created successfully.',
                'preference' => $newPreference,
            ], 201);
        }
    }
}
