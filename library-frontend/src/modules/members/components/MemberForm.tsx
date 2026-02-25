import { useState } from "react";
import type { MemberFormData } from "../types/member.types";
import { MEMBER_ROLES, MEMBER_STATUS } from "../constants/member.constants";
import BackButton from "./BackButton";

interface Props {
  initialData?: MemberFormData;
  onSubmit: (data: MemberFormData) => void;
}

const MemberForm = ({ initialData, onSubmit }: Props) => {
  const [formData, setFormData] = useState<MemberFormData>(
    initialData || {
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "Student",
      department: "",
      joinedDate: new Date().toISOString().split("T")[0],
      status: "Active",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {initialData ? "Edit Member" : "Add New Member"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Role & Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         bg-white focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {MEMBER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         bg-white focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {MEMBER_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium
                       hover:bg-blue-700 active:scale-[0.98] 
                       transition-all duration-200 shadow-sm"
          >
            Save Member
          </button>
        </div>
              <BackButton />
      </form>
    </div>
  );
};

export default MemberForm;