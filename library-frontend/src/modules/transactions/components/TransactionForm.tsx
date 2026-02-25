import React, { useState } from "react";

interface TransactionFormProps {
  members: { id: string; name: string }[];
  books: { id: string; title: string }[];
  onSubmit: (bookId: string, memberId: string) => Promise<void>;
  loading?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  members,
  books,
  onSubmit,
  loading = false,
}) => {
  const [memberId, setMemberId] = useState("");
  const [bookId, setBookId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!memberId || !bookId) {
      setError("Please select both member and book.");
      return;
    }

    try {
      setError("");
      await onSubmit(bookId, memberId);
      setMemberId("");
      setBookId("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Issue Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Member */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Member
          </label>
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Book */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Book
          </label>
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Issue Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;