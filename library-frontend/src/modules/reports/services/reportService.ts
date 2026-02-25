import { dbPromise } from "../../../lib/db";
import type {
  InventoryReport,
  IssuedReport,
  OverdueReport,
} from "../types/report.types";

export const reportService = {
  async getInventoryReport(): Promise<InventoryReport[]> {
    const db = await dbPromise;
    const books = await db.getAll("books");
    const transactions = await db.getAll("transactions");

    return books.map((book: any) => {
      const issuedCount = transactions.filter(
        (t: any) => t.bookId === book.id && t.status === "issued"
      ).length;

      return {
        bookId: book.id,
        title: book.title,
        author: book.author,
        totalCopies: book.totalCopies,
        availableCopies: book.totalCopies - issuedCount,
      };
    });
  },

  async getIssuedReport(): Promise<IssuedReport[]> {
    const db = await dbPromise;
    const transactions = await db.getAll("transactions");
    const books = await db.getAll("books");
    const members = await db.getAll("members");

    return transactions
      .filter((t: any) => t.status === "issued")
      .map((t: any) => ({
        transactionId: t.id,
        bookTitle: books.find((b: any) => b.id === t.bookId)?.title,
        memberName: members.find((m: any) => m.id === t.memberId)?.firstName,
        issueDate: t.issueDate,
        dueDate: t.dueDate,
      }));
  },

  async getOverdueReport(): Promise<OverdueReport[]> {
    const db = await dbPromise;
    const transactions = await db.getAll("transactions");

    const today = new Date();

    return transactions
      .filter((t: any) => {
        return (
          t.status === "issued" &&
          new Date(t.dueDate) < today
        );
      })
      .map((t: any) => {
        const daysOverdue = Math.ceil(
          (today.getTime() - new Date(t.dueDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return {
          transactionId: t.id,
          bookTitle: t.bookId,
          memberName: t.memberId,
          issueDate: t.issueDate,
          dueDate: t.dueDate,
          daysOverdue,
          fine: daysOverdue * 10, // ₹10 per day
        };
      });
  },
};