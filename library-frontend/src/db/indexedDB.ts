import { openDB } from "idb";

const DB_NAME = "LibraryDB";
const DB_VERSION = 5;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
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
  },
});