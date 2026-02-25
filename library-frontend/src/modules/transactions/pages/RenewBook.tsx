import { useTransactions } from "../hooks/useTransactions";

const RenewBook = () => {
  const { transactions, renewBook } = useTransactions(); // make sure renewBook exists

  const issuedBooks = transactions.filter(
    (t) => t.status === "issued"
  );

  const handleRenew = (transaction: any) => {
    if (!window.confirm("Extend due date for this book?")) return;

    renewBook(transaction);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Renew Book
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        {issuedBooks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-medium">
              No books available for renewal 📖
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Only currently issued books can be renewed.
            </p>
          </div>
        ) : (
          issuedBooks.map((t) => {
            const isOverdue = new Date(t.dueDate) < new Date();

            return (
              <div
                key={t.id}
                className="flex justify-between items-center border-b py-3 last:border-none"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    Book ID: {t.bookId}
                  </p>
                  <p
                    className={`text-sm ${
                      isOverdue ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    Due: {new Date(t.dueDate).toLocaleDateString()}
                    {isOverdue && " (Overdue)"}
                  </p>
                </div>

                <button
                  onClick={() => handleRenew(t)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                >
                  Renew
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RenewBook;