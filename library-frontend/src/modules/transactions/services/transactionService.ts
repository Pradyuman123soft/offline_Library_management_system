import { dbPromise } from "../../../lib/db";
import type { Transaction } from "../types/transaction.types";

// CREATE
export const addTransaction = async (transaction: Transaction) => {
  const db = await dbPromise;

  const enrichedTransaction = {
    ...transaction,
    updatedAt: new Date().toISOString(),
    synced: false, // 🔥 for sync tracking
  };

  await db.put("transactions", enrichedTransaction);

  await db.add("syncQueue", {
    id: crypto.randomUUID(),
    type: "transaction_create",
    entity: "transactions",
    payload: enrichedTransaction,
    synced: false,
    createdAt: new Date().toISOString(),
  });
};

// UPDATE
export const updateTransaction = async (transaction: Transaction) => {
  const db = await dbPromise;

  const enrichedTransaction = {
    ...transaction,
    updatedAt: new Date().toISOString(),
    synced: false,
  };

  await db.put("transactions", enrichedTransaction);

  await db.add("syncQueue", {
    id: crypto.randomUUID(),
    type: "transaction_update",
    entity: "transactions",
    payload: enrichedTransaction,
    synced: false,
    createdAt: new Date().toISOString(),
  });
};

// GET ALL
export const getAllTransactions = async () => {
  const db = await dbPromise;
  return await db.getAll("transactions");
};

// GET ACTIVE TRANSACTION BY BOOK
export const getTransactionByBook = async (bookId: string) => {
  const db = await dbPromise;

  const tx = db.transaction("transactions", "readonly");
  const store = tx.objectStore("transactions");
  const index = store.index("bookId");

  const all = await index.getAll(bookId);

  return all.find(
    (t) => t.status === "issued" || t.status === "overdue"
  );
};