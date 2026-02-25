export type BookStatus = 'available' | 'issued' | 'reserved';

export interface Book {
  id:number;
  isbn: string;
  title: string;
  category: string;
  author: string;
  publication: string;
  // status: BookStatus;
}

export interface OfflineBook extends Book {
  local_id?: number;
  synced: boolean;
}