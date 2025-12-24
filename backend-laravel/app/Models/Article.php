<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // Whitelisted attributes for mass assignment
    protected $fillable = [
        'title',
        'content',
        'source_url',
        'version',
        'references'
    ];
}
