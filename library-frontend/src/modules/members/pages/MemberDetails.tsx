import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById } from "../services/member.service";
import type { Member } from "../types/member.types";

const MemberDetails = () => {
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
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Member Details
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            View complete information about this member.
          </p>
          <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
        </div>

        {/* Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">

          {/* Name Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {member.firstName} {member.lastName}
            </h2>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{member.phone || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium text-blue-600">{member.role}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  member.status === "Active"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {member.status}
              </span>
            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate(`/members/edit/${member.id}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium
                         hover:bg-blue-700 active:scale-[0.98]
                         transition-all duration-200 shadow-sm"
            >
              Edit Member
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberDetails;