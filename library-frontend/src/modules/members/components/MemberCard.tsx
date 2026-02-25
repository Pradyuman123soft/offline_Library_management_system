import type { Member } from "../types/member.types";

interface Props {
  member: Member;
}

const MemberCard = ({ member }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 max-w-md w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {member.firstName} {member.lastName}
        </h3>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            member.status === "Active"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {member.status}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-3"></div>

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Email:</span>{" "}
          {member.email}
        </p>
        <p>
          <span className="font-medium text-gray-700">Role:</span>{" "}
          <span className="text-blue-600 font-medium">{member.role}</span>
        </p>
      </div>
    </div>
  );
};

export default MemberCard;