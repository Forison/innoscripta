<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sources',
        'authors',
    ];

    protected $casts = [
        'sources' => 'array',
        'authors' => 'array',
    ];
}
