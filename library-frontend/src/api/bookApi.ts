import api from './axios';
import type{ Book } from '../modules/books/types/book.types';

export const fetchBooks = async () => {
  console.log("data aara bhi hai...ya nhi??")
  const res = await api.get('/books');
  console.log(res);
  return res.data.data;
};

export const createBookOnline = async (book: Book) => {
  return api.post('/books/register', book);
};

export const deleteBookOnline = async (id: number) => {
  return api.delete(`/books/${id}`);
};

export const bulkSyncBooks = async (books: Book[]) => {
  return api.post('/books/bulk-sync', { books });
};

export const updateBookOnline = async (id: number, book: Book) => {
  return api.put(`/books/${id}`, book);
};

// export const getOfflineBooks = async () => {
//   const db = await openDB("LMS_DB", 1);
//   return await db.getAll("offlineBooks");
// };

// export const deleteOfflineBook = async (id: number) => {
//   const db = await openDB("LMS_DB", 1);

//   await db.delete("offlineBooks", id);
// };