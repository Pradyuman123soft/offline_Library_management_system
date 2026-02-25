import type { Member } from "../types/member.types";

interface Props {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

const MemberTable = ({ members, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          
          {/* Table Header */}
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {members.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {member.firstName} {member.lastName}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {member.email}
                </td>

                <td className="px-6 py-4 text-blue-600 font-medium">
                  {member.role}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      member.status === "Active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    onClick={() => onEdit(member)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(member.id)}
                    className="text-gray-500 hover:text-red-600 font-medium transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MemberTable;