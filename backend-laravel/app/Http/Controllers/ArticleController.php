<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // get /api/articles
    public function index(Request $request)
    {
        $query = Article::query();
        
        // Handle sort parameter
        $sort = $request->get('sort', 'latest');
        $limit = $request->get('limit', 5);
        
        if ($sort === 'oldest') {
            $query->oldest();
        } else {
            $query->latest(); // Default to latest
        }
        
        // Handle limit parameter
        if ($limit) {
            $query->take($limit);
        }
        
        return $query->get();
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

    // post /api/articles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'source_url' => 'nullable|url'
        ]);

        $article = Article::create($validated);
        return response()->json($article, 201);
    }

    // delete /api/articles/{id}
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully']);
    }
}
