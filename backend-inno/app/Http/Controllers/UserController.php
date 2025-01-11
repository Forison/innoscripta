<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function currentUser(): JsonResponse
    {
        $user = Auth::user();

        if ($user) {
            return response()->json($user, 200);
        }

        return response()->noContent(404);
    }
}
