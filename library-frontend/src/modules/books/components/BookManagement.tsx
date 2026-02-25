import { useEffect, useMemo, useState } from "react";
import BookForm from "./BookFrom";
import type { Book } from "../types/book.types";

import {
  saveOfflineBook,
  getAllOfflineBooks,
  deleteOfflineBook,
} from "../../../db/bookStore";

import { syncData } from "../../../lib/sync.service";

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const emptyForm: Book = {
    id: 0,
    isbn: "",
    title: "",
    category: "",
    author: "",
    publication: "",
  };

  const [form, setForm] = useState<Book>(emptyForm);

  // ================= LOAD =================
  const loadBooks = async () => {
    const all = await getAllOfflineBooks();
    setBooks(all.filter((b: any) => !b.isDeleted));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // ================= ADD =================
  const handleSubmit = async () => {
    await saveOfflineBook(form);
    await loadBooks();
    setIsFormOpen(false);
    resetForm();
  };

  const resetForm = () => setForm(emptyForm);

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    await deleteOfflineBook(id);
    await loadBooks();
  };

  // ================= SEARCH =================
  const filteredBooks = useMemo(() => {
    const value = search.toLowerCase();
    return books.filter((b) =>
      `${b.isbn} ${b.title} ${b.author} ${b.category} ${b.publication}`
        .toLowerCase()
        .includes(value),
    );
  }, [books, search]);

  // ================= AUTO SYNC =================
  useEffect(() => {
    const handleOnline = async () => {
      await syncData();
      await loadBooks();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Books
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and monitor all available books.
            </p>
            <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium
                       hover:bg-blue-700 active:scale-[0.98]
                       transition-all duration-200 shadow-sm"
          >
            + Add Book
          </button>
        </div>

        {/* Search */}
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books..."
            className="w-full sm:w-96 rounded-lg border border-gray-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
          />
        </div>

        {/* Form Section (Inline Like Member Add Page) */}
        {isFormOpen && (
          <BookForm
            form={form}
            setForm={setForm}
            editingId={null}
            handleSubmit={handleSubmit}
            setIsFormOpen={setIsFormOpen}
          />
        )}

        {/* Table Section */}
        {filteredBooks.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr className="border-b">
                  <th className="px-6 py-3 text-left font-medium">ISBN</th>
                  <th className="px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-6 py-3 text-left font-medium">Author</th>
                  <th className="px-6 py-3 text-left font-medium">Category</th>
                  <th className="px-6 py-3 text-left font-medium">Publication</th>
                  <th className="px-6 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{b.isbn}</td>
                    <td className="px-6 py-3">{b.title}</td>
                    <td className="px-6 py-3">{b.author}</td>
                    <td className="px-6 py-3">{b.category}</td>
                    <td className="px-6 py-3">{b.publication}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDelete(b.id!)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 text-center">
            <p className="text-gray-600 text-sm">
              No books found. Start by adding your first book.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium
                         hover:bg-blue-700 transition"
            >
              Add Book
            </button>
          </div>
        )}

        <p className="text-sm text-gray-500">
          Showing {filteredBooks.length} of {books.length} books
        </p>

      </div>
    </div>
  );
}