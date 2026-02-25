<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    // Get all books
    public function index()
    {
        return response()->json(Book::all());
    }

    // Add new book
    public function store(Request $request)
    {
        $validated = $request->validate([
        'isbn' => 'required|string',
        'title' => 'required|string',
        'author' => 'required|string',
        'category' => 'required|string',
        'publication' => 'required|string',
        'total_quantity' => 'nullable|integer'
        ]);
    
        $book = Book::create([
            'isbn' => $validated['isbn'],
            'title' => $validated['title'],
            'author' => $validated['author'],
            'category' => $validated['category'],
            'publication' => $validated['publication'],
            'total_quantity' => $validated['total_quantity'] ?? 1,
        ]);
    
        return response()->json($book, 201);
    }

    // Update book
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        $book->update($request->all());
        return response()->json($book);
    }

    // Delete book
    public function destroy($id)
    {
        Book::destroy($id);
        return response()->json(['message' => 'Book deleted']);
    }

    // Bulk sync books
public function bulkSync(Request $request)
{
    $books = $request->input('books', []);

    foreach ($books as $book) {

        if (!isset($book['isbn'])) {
            continue; // skip invalid data
        }

        Book::updateOrCreate(
            ['isbn' => $book['isbn']],
            [
                'title' => $book['title'] ?? '',
                'author' => $book['author'] ?? '',
                'category' => $book['category'] ?? '',
                'publication' => $book['publication'] ?? '',
                'total_quantity' => $book['total_quantity'] ?? 1,
            ]
        );
    }

    return response()->json([
        'message' => 'Books synced successfully'
    ]);
}
}