import { useEffect, type ChangeEvent, type FormEvent, type Dispatch, type SetStateAction } from "react";
import type { Book } from "../types/book.types";

interface BookFormProps {
  form: Book;
  setForm: Dispatch<SetStateAction<Book>>;
  editingId: number | null;
  handleSubmit: () => Promise<void>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

const BookForm: React.FC<BookFormProps> = ({
  form,
  setForm,
  editingId,
  handleSubmit,
  setIsFormOpen,
}) => {

  // 🔥 Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit();
    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsFormOpen(false)}
      />

      {/* Modal Card */}
      <div
        className="relative bg-white w-full max-w-3xl mx-4 
                   border border-gray-200 rounded-xl shadow-xl 
                   p-8 animate-[fadeIn_.2s_ease-out]"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsFormOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {editingId ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Publication */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publication
            </label>
            <input
              name="publication"
              value={form.publication}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium
                         hover:bg-blue-700 active:scale-[0.98]
                         transition-all duration-200 shadow-sm"
            >
              {editingId ? "Update Book" : "Save Book"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookForm;