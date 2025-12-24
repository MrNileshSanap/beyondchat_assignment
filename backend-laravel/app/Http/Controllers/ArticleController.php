<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // get /api/articles
    public function index()
    {
        return Article::latest()->get();
    }

    // get /api/articles/{id}
    public function show($id)
    {
        return Article::findOrFail($id);
    }

    // put /api/articles/{id}
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->only(['title', 'content']));
        return $article;
    }
}
