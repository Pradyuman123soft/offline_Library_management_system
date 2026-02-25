import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Props {
  data: any[];
  fileName: string;
}

const ExportButton = ({ data, fileName }: Props) => {
  const handleExport = () => {
    if (!data.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!data.length}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 
                 text-white px-5 py-2 rounded-lg text-sm font-medium 
                 transition shadow"
    >
      Export to Excel
    </button>
  );
};

export default ExportButton;