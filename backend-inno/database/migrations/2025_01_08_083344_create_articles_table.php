<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('source_id')->nullable()->default(null);
            $table->string('source_name');
            $table->string('author', 3000);
            $table->string('title');
            $table->text('description');
            $table->string('url', 3000);
            $table->string('urlToImage', 3000)->nullable()->default(null);
            $table->timestamp('publishedAt');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
