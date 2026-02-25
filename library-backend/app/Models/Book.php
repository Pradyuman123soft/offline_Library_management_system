<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'isbn',
        'title',
        'category',
        'author',
        'publication',
        'total_quantity'
    ];

    public function issues()
    {
        return $this->hasMany(BookIssue::class);
    }

    public function activeIssues()
    {
        return $this->hasMany(BookIssue::class)->whereNull('returned_at');
    }
}