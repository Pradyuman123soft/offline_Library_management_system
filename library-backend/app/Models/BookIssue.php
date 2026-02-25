<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class BookIssue extends Model
{
    protected $fillable = [
        'book_id',
        'user_id',
        'issued_at',
        'due_date',
        'returned_at'
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}