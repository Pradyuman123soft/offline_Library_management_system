import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addTransaction,
  updateTransaction,
  getAllTransactions,
  getTransactionByBook,
} from "../services/transactionService";
import type { Transaction } from "../types/transaction.types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    const data = await getAllTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // ISSUE BOOK
  const issueBook = async (bookId: string, memberId: string) => {
    const existing = await getTransactionByBook(bookId);

    if (existing) {
      throw new Error("Book already issued");
    }

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 7);

    const newTransaction: Transaction = {
      id: uuidv4(),
      bookId,
      memberId,
      issueDate: today.toISOString(),
      dueDate: due.toISOString(),
      status: "issued",
      syncStatus: "pending",
      renewCount: 0, // NEW FIELD
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
    };

    await addTransaction(newTransaction);
    await loadTransactions();
  };

  // RETURN BOOK
  const returnBook = async (transaction: Transaction) => {
    const today = new Date();
    const due = new Date(transaction.dueDate);

    let fine = 0;

    if (today > due) {
      const diffDays = Math.ceil(
        (today.getTime() - due.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      fine = diffDays * 10;
    }

    transaction.status = "returned";
    transaction.returnDate = today.toISOString();
    transaction.fineAmount = fine;
    transaction.syncStatus = "pending";
    transaction.updatedAt = today.toISOString();

    await updateTransaction(transaction);
    await loadTransactions();
  };

  // 🔥 RENEW BOOK
  const renewBook = async (transaction: Transaction) => {
    if (transaction.status !== "issued") {
      throw new Error("Only issued books can be renewed");
    }

    // Optional: Max 2 renewals
    if ((transaction.renewCount ?? 0) >= 2) {
      throw new Error("Renew limit reached (Max 2 times)");
    }

    const newDue = new Date(transaction.dueDate);
    newDue.setDate(newDue.getDate() + 7);

    transaction.dueDate = newDue.toISOString();
    transaction.renewCount = (transaction.renewCount ?? 0) + 1;
    transaction.syncStatus = "pending";
    transaction.updatedAt = new Date().toISOString();

    await updateTransaction(transaction);
    await loadTransactions();
  };

  return {
    transactions,
    issueBook,
    returnBook,
    renewBook, // 👈 IMPORTANT
    loadTransactions,
  };
};