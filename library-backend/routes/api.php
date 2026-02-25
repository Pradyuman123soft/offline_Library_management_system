<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookIssueController;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/create-staff', [AuthController::class, 'createStaff']);
    Route::get('/staff', [AuthController::class, 'getStaff']);
    
    });
    
    Route::apiResource('members', MemberController::class);
    Route::apiResource('transactions', TransactionController::class);
    Route::apiResource('reservations', ReservationController::class);



    Route::apiResource('books', BookController::class);
    Route::post('books/bulk-sync', [BookController::class, 'bulkSync']);
    Route::post('books/register', [BookController::class, 'store']);
    Route::post('issue', [BookIssueController::class, 'issue']);
    Route::get('index', [BookIssueController::class, 'index']);