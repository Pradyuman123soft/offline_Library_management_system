import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportFilters from "../components/ReportFilters";
import ReportTable from "../components/ReportTable";
import ExportButton from "../components/ExportButton";
import { useReports } from "../hooks/useReports";
import type { ReportType } from "../types/report.types";
// import { useAuth } from "../../../context/AuthContext";

const ReportsDashboard = () => {
  const navigate = useNavigate();
//   const { user } = useAuth();

  const { data, loading, loadReport } = useReports();
  const [selectedReport, setSelectedReport] =
    useState<ReportType>("inventory");

  // Admin protection
//   useEffect(() => {
//     if (user?.role !== "admin") {
//       navigate("/unauthorized");
//     }
//   }, [user, navigate]);

  // Load report when selection changes
  useEffect(() => {
    loadReport(selectedReport);
  }, [selectedReport]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline mb-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Reports & Export
          </h1>
          <p className="text-sm text-gray-500">
            Generate and export system reports
          </p>
        </div>

        <ExportButton
          data={data}
          fileName={selectedReport}
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <ReportFilters
          selected={selectedReport}
          onChange={setSelectedReport}
        />
      </div>

      {/* Table */}
      <ReportTable
        data={data}
        loading={loading}
      />
    </div>
  );
};

export default ReportsDashboard;