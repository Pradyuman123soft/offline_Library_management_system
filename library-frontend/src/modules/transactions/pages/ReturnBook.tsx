import { useTransactions } from "../hooks/useTransactions";

const ReturnBook = () => {
  const { transactions, returnBook } = useTransactions();

  const issuedBooks = transactions.filter(
    (t) => t.status === "issued"
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Return Book
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        
        {/* If No Issued Books */}
        {issuedBooks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-medium">
              No books currently issued 📚
            </p>
            <p className="text-sm text-gray-400 mt-2">
              When a book is issued, it will appear here for return.
            </p>
          </div>
        ) : (
          issuedBooks.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center border-b py-3 last:border-none"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  Book ID: {t.bookId}
                </p>
                <p className="text-sm text-gray-500">
                  Member ID: {t.memberId}
                </p>
              </div>

              <button
                onClick={() => returnBook(t)}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Return
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReturnBook;