import type { ReportType } from "../types/report.types";

interface Props {
  selected: ReportType;
  onChange: (type: ReportType) => void;
}

const ReportFilters = ({ selected, onChange }: Props) => {
  const reports: { label: string; value: ReportType }[] = [
    { label: "Inventory Report", value: "inventory" },
    { label: "Issued Books", value: "issued" },
    { label: "Overdue Report", value: "overdue" },
    { label: "Daily Activity", value: "daily" },
    { label: "Member Activity", value: "memberActivity" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3">
      {reports.map((report) => (
        <button
          key={report.value}
          onClick={() => onChange(report.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
          ${
            selected === report.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-blue-50"
          }`}
        >
          {report.label}
        </button>
      ))}
    </div>
  );
};

export default ReportFilters;