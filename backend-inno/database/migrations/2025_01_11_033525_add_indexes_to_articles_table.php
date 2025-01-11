<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->index('source_id');
            $table->index('source_name');
            $table->index('publishedAt');

            $table->fullText(['title', 'content', 'description', 'author']);
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex(['source_id']);
            $table->dropIndex(['source_name']);
            $table->dropIndex(['publishedAt']);
            $table->dropFullText(['title', 'content', 'description', 'author']);
        });
    }
};
