const API_BASE = "http://127.0.0.1:8000/api";

async function safeFetch(url: string, options?: RequestInit) {
  if (!navigator.onLine) {
    throw new Error("Offline");
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Server Error");
  }

  return res.json();
}

export const api = {
  // ==========================
  // 👤 MEMBERS
  // ==========================
  async getMembers() {
    return safeFetch(`${API_BASE}/members`);
  },

  async syncMember(member: any) {
    return safeFetch(`${API_BASE}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
  },

  async deleteMember(id: string) {
    return safeFetch(`${API_BASE}/members/${id}`, {
      method: "DELETE",
    });
  },

  // ==========================
  // 📚 BOOKS (MERGED CLEANLY)
  // ==========================

  async getBooks() {
    const res = await safeFetch(`${API_BASE}/books`);
    // friend was using res.data.data
    // adjust according to backend
    return res.data ?? res;
  },

  async createBook(book: any) {
    return safeFetch(`${API_BASE}/books/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
  },

  async updateBook(id: number, book: any) {
    return safeFetch(`${API_BASE}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
  },

  async deleteBook(id: number) {
    return safeFetch(`${API_BASE}/books/${id}`, {
      method: "DELETE",
    });
  },

  async bulkSyncBooks(books: any[]) {
    return safeFetch(`${API_BASE}/books/bulk-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books }),
    });
  },

  // ==========================
  // 📚 TRANSACTIONS
  // ==========================
  async syncTransaction(transaction: any) {
    return safeFetch(`${API_BASE}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
  },

  async deleteTransaction(id: string) {
    return safeFetch(`${API_BASE}/transactions/${id}`, {
      method: "DELETE",
    });
  },
};