import { openDB } from "idb";

export const dbPromise = openDB("library-db", 6, {
  upgrade(db) {

    // -------------------------
    // MEMBERS STORE
    // -------------------------
    if (!db.objectStoreNames.contains("members")) {
      db.createObjectStore("members", {
        keyPath: "id",
      });
    }

    // -------------------------
    // BOOK STORES (FROM FRIEND)
    // -------------------------

    if (!db.objectStoreNames.contains("books")) {
      db.createObjectStore("books", {
        keyPath: "id",
        autoIncrement: true,
      });
    }

    if (!db.objectStoreNames.contains("books_cache")) {
      db.createObjectStore("books_cache", {
        keyPath: "id",
      });
    }

    if (!db.objectStoreNames.contains("books_unsynced")) {
      db.createObjectStore("books_unsynced", {
        keyPath: "local_id",
        autoIncrement: true,
      });
    }

    // -------------------------
    // SYNC QUEUE STORE
    // -------------------------
    if (!db.objectStoreNames.contains("syncQueue")) {
      db.createObjectStore("syncQueue", {
        keyPath: "queueId",
        autoIncrement: true,
      });
    }

    // -------------------------
    // TRANSACTIONS STORE
    // -------------------------
    if (!db.objectStoreNames.contains("transactions")) {
      const transactionStore = db.createObjectStore("transactions", {
        keyPath: "id",
      });

      transactionStore.createIndex("bookId", "bookId");
      transactionStore.createIndex("memberId", "memberId");
      transactionStore.createIndex("status", "status");
      transactionStore.createIndex("syncStatus", "syncStatus");
    }

    // -------------------------
    // RESERVATIONS STORE
    // -------------------------
    if (!db.objectStoreNames.contains("reservations")) {
      const reservationStore = db.createObjectStore("reservations", {
        keyPath: "id",
      });

      reservationStore.createIndex("bookId", "bookId");
      reservationStore.createIndex("memberId", "memberId");
      reservationStore.createIndex("status", "status");
      reservationStore.createIndex("syncStatus", "syncStatus");
    }
  },
});