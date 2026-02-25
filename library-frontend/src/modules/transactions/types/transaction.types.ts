export type TransactionStatus =
  | "issued"
  | "returned"
  | "overdue"
  | "renewed";

export type SyncStatus = "pending" | "synced";

export interface Transaction {
  id: string;
  bookId: string;
  memberId: string;

  issueDate: string;
  dueDate: string;
  returnDate?: string;

  fineAmount?: number;

  // ✅ ADD THIS
  renewCount?: number;

  status: TransactionStatus;
  syncStatus: SyncStatus;

  createdAt: string;
  updatedAt: string;
}