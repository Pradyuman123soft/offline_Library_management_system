import { useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";

const TransactionsList = () => {
  const { transactions, loadTransactions, returnBook } = useTransactions();

  useEffect(() => {
    loadTransactions();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return "bg-blue-100 text-blue-600";
      case "returned":
        return "bg-green-100 text-green-600";
      case "overdue":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Transactions
          </h1>
          <p className="text-gray-500 text-sm">
            Manage issued, returned and overdue books.
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3">Member</th>
              <th className="px-6 py-3">Book</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Fine</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No transactions found 📚
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{t.memberId}</td>
                  <td className="px-6 py-4">{t.bookId}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(t.dueDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    ₹{t.fineAmount ?? 0}
                  </td>

                  <td className="px-6 py-4 space-x-3">
                    {t.status === "issued" && (
                      <button
                        onClick={() => returnBook(t)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;