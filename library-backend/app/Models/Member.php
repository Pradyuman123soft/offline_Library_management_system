<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Member extends Model
{
    use HasUuids;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'firstName',
        'lastName',
        'email',
        'phone',
        'role',
        'department',
        'joinedDate',
        'status',
        'createdAt',
        'updatedAt',
        'syncStatus',
        'isDeleted'
    ];

    protected $casts = [
        'isDeleted' => 'boolean',
        'joinedDate' => 'date',
    ];
}