import { api } from "./api";

import { getMembers, updateMember } 
  from "../modules/members/services/member.service";

import { 
  getAllTransactions, 
  updateTransaction 
} from "../modules/transactions/services/transactionService";
import {
  getPendingBooks,
  markBookSynced
} from "../db/bookStore";


let isSyncing = false;

export async function syncData() {
  if (!navigator.onLine) return;
  if (isSyncing) return;

  isSyncing = true;

  console.log("🔄 Syncing with server...");

  try {
    // ==========================
    // 🔵 MEMBERS SYNC
    // ==========================
    const allMembers = await getMembers();

    const pendingMembers = allMembers.filter(
      (m) => m.syncStatus === "pending"
    );

    for (const member of pendingMembers) {
      try {
        if (member.isDeleted) {
          await api.deleteMember(member.id);
        } else {
          await api.syncMember(member);
        }

        await updateMember({
          ...member,
          syncStatus: "synced",
          updatedAt: new Date().toISOString(),
        });

        console.log("✅ Member Synced:", member.id);
      } catch (error) {
        console.error("❌ Member sync failed:", member.id);
      }
    }


    // ==========================
    // 🟢 BOOKS SYNC
    // ==========================

    const pendingBooks = await getPendingBooks();

  for (const book of pendingBooks) {
    try {
      if (book.isDeleted) {
        await api.deleteBook(book.id);
      } else {
        await api.createBook(book);
      }

      await markBookSynced(book.id);

      console.log("✅ Book Synced:", book.id);
    } catch (error) {
      console.error("❌ Book sync failed:", book.id);
    }
  }

    // ==========================
    // 🟣 TRANSACTIONS SYNC
    // ==========================
    const allTransactions = await getAllTransactions();

    const pendingTransactions = allTransactions.filter(
      (t) => t.syncStatus === "pending"
    );

    for (const transaction of pendingTransactions) {
      try {
        if (transaction.isDeleted) {
          await api.deleteTransaction(transaction.id);
        } else {
          await api.syncTransaction(transaction);
        }

        await updateTransaction({
          ...transaction,
          syncStatus: "synced",
          updatedAt: new Date().toISOString(),
        });

        console.log("✅ Transaction Synced:", transaction.id);
      } catch (error) {
        console.error("❌ Transaction sync failed:", transaction.id);
      }
    }

    console.log("🎉 Sync complete");
  } finally {
    isSyncing = false;
  }
}