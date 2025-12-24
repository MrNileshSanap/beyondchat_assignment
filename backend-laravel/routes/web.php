<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ArticleController;

Route::get('/api/articles', [ArticleController::class, 'index']);
Route::get('/api/articles/{id}', [ArticleController::class, 'show']);
Route::put('/api/articles/{id}', [ArticleController::class, 'update']);
