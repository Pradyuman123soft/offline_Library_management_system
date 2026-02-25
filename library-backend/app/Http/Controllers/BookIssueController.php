<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\BookIssue;

class BookIssueController extends Controller
{
    public function index()
    {
        $books = Book::withCount([
            'activeIssues as issued_count'
        ])->get();

        $books->transform(function ($book) {
            $book->available_quantity =
                $book->total_quantity - $book->issued_count;

            return $book;
        });

        return response()->json($books);
    }

    public function issue(Request $request)
    {
        $book = Book::find($request->book_id);

        $issuedCount = $book->activeIssues()->count();
        dd($issuedCount);

        
        if ($issuedCount >= $book->total_quantity) {
            return response()->json(['error' => 'No copies available'], 400);
        }

        BookIssue::create([
            'book_id' => $book->id,
            'user_id' => $request->user_id ?? null,
            'issued_at' => now(),
            'due_date' => now()->addDays(7),
            'returned_at' => null(),
        ]);

        return response()->json(['success' => true]);
    }
}