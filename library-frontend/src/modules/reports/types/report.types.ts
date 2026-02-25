export type ReportType =
  | "inventory"
  | "issued"
  | "overdue"
  | "daily"
  | "memberActivity";

export interface InventoryReport {
  bookId: string;
  title: string;
  author: string;
  totalCopies: number;
  availableCopies: number;
}

export interface IssuedReport {
  transactionId: string;
  bookTitle: string;
  memberName: string;
  issueDate: string;
  dueDate: string;
}

export interface OverdueReport extends IssuedReport {
  daysOverdue: number;
  fine: number;
}

export interface DailyActivityReport {
  date: string;
  booksIssued: number;
  booksReturned: number;
  newMembers: number;
}

export interface MemberActivityReport {
  memberId: string;
  memberName: string;
  totalIssued: number;
  totalReturned: number;
  activeBooks: number;
}