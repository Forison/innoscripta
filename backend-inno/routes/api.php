<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/{article}', [ArticleController::class, 'show']);
    Route::get('/search', [ArticleController::class, 'search']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::resource('/articles', ArticleController::class)->except(['index', 'create', 'edit', 'show']);
        Route::get('/articles/preference/{article}', [ArticleController::class, 'fetchPersonalizedFeed']);
        Route::get('/profile', [UserController::class, 'currentUser']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
