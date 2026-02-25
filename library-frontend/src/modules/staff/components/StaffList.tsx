import { useEffect, useState } from "react";
import { getStaffList } from "../services/staffService";

interface Staff {
  id: string;
  name: string;
  email: string;
}

const StaffList = () => {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const data = await getStaffList();
    setStaff(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">
            Staff List
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            View all registered staff members.
          </p>
          <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          
          {staff.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                
                {/* Header */}
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-gray-100">
                  {staff.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {s.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {s.email}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-600">
                No staff members found.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default StaffList;