import { MEMBER_ROLES, MEMBER_STATUS } from "../constants/member.constants";

interface Props {
  search: string;
  role: string;
  status: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const MemberFilters = ({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
      
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          />
        </div>

        {/* Role Filter */}
        <div className="w-full md:w-56">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm 
                       bg-white focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Roles</option>
            {MEMBER_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-56">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm 
                       bg-white focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Status</option>
            {MEMBER_STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default MemberFilters;