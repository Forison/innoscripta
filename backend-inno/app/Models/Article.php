<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'source_id',
        'source_name',
        'author',
        'title',
        'description',
        'url',
        'urlToImage',
        'publishedAt',
        'content',
    ];

    protected $casts = [
        'publishedAt' => 'datetime',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'article_user', 'article_id', 'user_id');
    }

    public function rules()
    {
        return [
            'source_id' => 'nullable|exists:sources,id',
            'source_name' => 'required|string',
            'author' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'url' => 'required|url',
            'urlToImage' => 'nullable|url',
            'publishedAt' => 'required|date',
            'content' => 'required|string',
        ];
    }

    public function scopeMostRecent($query)
    {
        return $query->whereNotNull('publishedAt')->orderBy('publishedAt', 'desc');
    }
}
