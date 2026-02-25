import { useState } from "react";
import { createStaff } from "../services/staffService";

interface Props {
  refresh: () => void;
}

const StaffForm = ({ refresh }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createStaff(name, email, password);

      setName("");
      setEmail("");
      setPassword("");

      refresh();
    } catch {
      alert("Error creating staff");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 max-w-xl w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Create Staff
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Add a new staff member to the system.
        </p>
        <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
            placeholder="Enter email address"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
            placeholder="Enter secure password"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium
                       hover:bg-blue-700 active:scale-[0.98]
                       transition-all duration-200 shadow-sm"
          >
            Create Staff
          </button>
        </div>

      </form>
    </div>
  );
};

export default StaffForm;