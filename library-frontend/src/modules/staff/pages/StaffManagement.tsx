import StaffForm from "../components/StaffForm";
import StaffList from "../components/StaffList";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

const StaffManagement = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Unauthorized Access
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Staff Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage administrative and staff accounts.
          </p>
          <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <StaffForm refresh={() => setRefreshKey(prev => prev + 1)} />
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <StaffList key={refreshKey}/>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StaffManagement;