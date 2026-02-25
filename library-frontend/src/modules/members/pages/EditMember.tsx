import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MemberForm from "../components/MemberForm";
import { getMemberById, updateMember } from "../services/member.service";
import type { Member, MemberFormData } from "../types/member.types";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (id) {
        const data = await getMemberById(id);
        if (data) setMember(data);
      }
    };

    fetchMember();
  }, [id]);

  const handleSubmit = async (formData: MemberFormData) => {
  if (!id) return;

  await updateMember({
    ...member!,          // keep old system fields
    ...formData,         // overwrite editable fields
    updatedAt: new Date().toISOString(),
    syncStatus: "pending",
  });

  navigate("/members");
};

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-sm animate-pulse">
          Loading member details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Edit Member
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Update member information and manage their role or status.
          </p>

          <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
        </div>

        {/* Form */}
        <MemberForm initialData={member} onSubmit={handleSubmit} />

      </div>

    </div>
  );
};

export default EditMember;