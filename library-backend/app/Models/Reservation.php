<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


    class Reservation extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'book_id',
        'member_id',
        'reservation_date',
        'status',
        'sync_status',
    ];
}

