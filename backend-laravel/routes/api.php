<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

// CRUD API routes
Route::get('/articles', [ArticleController::class, 'index']);          
Route::get('/articles/{id}', [ArticleController::class, 'show']);      // fetch single article
Route::post('/articles', [ArticleController::class, 'store']);         // create article
Route::put('/articles/{id}', [ArticleController::class, 'update']);    
Route::delete('/articles/{id}', [ArticleController::class, 'destroy']); 
