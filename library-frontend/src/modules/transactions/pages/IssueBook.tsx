import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import { getMembers } from "../../members/services/member.service";
// import { getBooks } from "../../books/services/book.service";
import type { Member } from "../../members/types/member.types";
import type { Book } from "../../books/types/book.types";
import { getAllOfflineBooks } from "../../../db/bookStore";

const IssueBook = () => {
  const { issueBook } = useTransactions();

  // ✅ Properly typed state
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
  const loadData = async () => {
    try {
      const membersData = await getMembers();
      const booksData = await getAllOfflineBooks();

      setMembers(membersData);
      setBooks(booksData);
      // setBooks([]);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  loadData();
}, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Issue Book
      </h1>

      <TransactionForm
        members={members.map((m) => ({
          id: m.id,
          name: `${m.firstName} ${m.lastName}`,
        }))}
        books={books.map((b) => ({
          id: b.isbn,          // 🔥 IMPORTANT
          title: b.title,
        }))}
        onSubmit={issueBook}
      />
    </div>
  );
};

export default IssueBook;