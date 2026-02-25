import { useNavigate } from "react-router-dom";
import MemberForm from "../components/MemberForm";
import { useMembers } from "../hooks/useMembers";
import type { Member, MemberFormData } from "../types/member.types";
import { v4 as uuidv4 } from "uuid";

const AddMember = () => {
  const { createMember } = useMembers();
  const navigate = useNavigate();

  const handleSubmit = async (data: MemberFormData) => {
    const newMember: Member = {
      ...data,
      id: uuidv4(),

      // 🔥 System controlled fields
      createdAt: Date.now(),
      updatedAt: new Date().toISOString(),
      syncStatus: "pending",
      isDeleted: false,
    };

    await createMember(newMember);
    navigate("/members");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Add Member
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Create a new member and assign their role and status.
          </p>

          <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
        </div>

        {/* Form Section */}
        <MemberForm onSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default AddMember;