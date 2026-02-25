import { useNavigate } from "react-router-dom";
import { useMembers } from "../hooks/useMembers";
import MemberTable from "../components/MemberTable";

const MembersList = () => {
  const { members, removeMember } = useMembers();
  const navigate = useNavigate();

  const handleEdit = (member: any) => {
    navigate(`/members/edit/${member.id}`);
  };

  const handleDelete = async (id: string) => {
    await removeMember(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Members
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and monitor all registered members.
            </p>
            <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
          </div>

          <button
            onClick={() => navigate("/members/add")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium
                       hover:bg-blue-700 active:scale-[0.98]
                       transition-all duration-200 shadow-sm"
          >
            + Add Member
          </button>
        </div>

        {/* Table Section */}
        {members.length > 0 ? (
          <MemberTable
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 text-center">
            <p className="text-gray-600 text-sm">
              No members found. Start by adding your first member.
            </p>
            <button
              onClick={() => navigate("/members/add")}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium
                         hover:bg-blue-700 transition"
            >
              Add Member
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default MembersList;