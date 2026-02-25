import { useState } from "react";
import { reportService } from "../services/reportService";
import type { ReportType } from "../types/report.types";

export const useReports = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReport = async (type: ReportType) => {
    setLoading(true);

    try {
      let result: any[] = [];

      switch (type) {
        case "inventory":
          result = await reportService.getInventoryReport();
          break;

        case "issued":
          result = await reportService.getIssuedReport();
          break;

        case "overdue":
          result = await reportService.getOverdueReport();
          break;

        default:
          result = [];
      }

      setData(result || []);
    } catch (error) {
      console.error("Report loading error:", error);
      setData([]); // prevent UI crash
    } finally {
      setLoading(false); // 🔥 ALWAYS RUNS
    }
  };

  return {
    data,
    loading,
    loadReport,
  };
};