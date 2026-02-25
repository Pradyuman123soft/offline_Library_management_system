<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'book_id',
        'member_id',
        'issue_date',
        'due_date',
        'return_date',
        'fine_amount',
        'renew_count',
        'status',
        'sync_status',
    ];
}
