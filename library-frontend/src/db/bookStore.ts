// import { dbPromise } from "./indexedDB";;
// import type { Book, OfflineBook } from '../modules/books/types/book.types';

// export const saveOfflineBook = async (book: Book) => {
//   const db = await dbPromise;

//   return db.add('books', {
//     ...book,
//     synced: false,
//   } as OfflineBook);
// };

// export const getUnsyncedBooks = async (): Promise<OfflineBook[]> => {
//   const db = await dbPromise;
//   const all = await db.getAll('books');
//   return all.filter((b) => !b.synced);
// };

// export const markSynced = async (local_id: number) => {
//   const db = await dbPromise;
//   const book = await db.get('books', local_id);

//   if (!book) return;

//   book.synced = true;
//   return db.put('books', book);
// };


// export const saveAllBooksOffline = async (books: Book[]) => {
//   const db = await dbPromise;

//   const tx = db.transaction('books', 'readwrite');
//   const store = tx.objectStore('books');

//   for (const book of books) {
//     await store.put({
//       ...book,
//       synced: true,
//     });
//   }

//   await tx.done;
// };

// export const getAllOfflineBooks = async () => {
//   const db = await dbPromise;
//   return await db.getAll('books');
// };


import { dbPromise } from "../lib/db"; // adjust path if needed
import type { Book } from "../modules/books/types/book.types";

export interface OfflineBook extends Book {
  syncStatus: "pending" | "synced";
  isDeleted?: boolean;
  updatedAt: string;
}

// ✅ Get All Books (UI will use this)
export const getAllOfflineBooks = async (): Promise<OfflineBook[]> => {
  const db = await dbPromise;
  return db.getAll("books");
};

// ✅ Add Book (Offline First)
export const saveOfflineBook = async (book: Book) => {
  const db = await dbPromise;

  return db.add("books", {
    ...book,
    syncStatus: "pending",
    isDeleted: false,
    updatedAt: new Date().toISOString(),
  } as OfflineBook);
};

// ✅ Update Book
export const updateOfflineBook = async (book: OfflineBook) => {
  const db = await dbPromise;

  return db.put("books", {
    ...book,
    syncStatus: "pending",
    updatedAt: new Date().toISOString(),
  });
};

// ✅ Soft Delete
export const deleteOfflineBook = async (id: number) => {
  const db = await dbPromise;
  const book = await db.get("books", id);

  if (!book) return;

  book.isDeleted = true;
  book.syncStatus = "pending";
  book.updatedAt = new Date().toISOString();

  return db.put("books", book);
};

// ✅ Get Pending Books (For Sync)
export const getPendingBooks = async (): Promise<OfflineBook[]> => {
  const db = await dbPromise;
  const all = await db.getAll("books");

  return all.filter((b) => b.syncStatus === "pending");
};

// ✅ Mark Synced
export const markBookSynced = async (id: number) => {
  const db = await dbPromise;
  const book = await db.get("books", id);

  if (!book) return;

  book.syncStatus = "synced";
  book.updatedAt = new Date().toISOString();

  return db.put("books", book);
};