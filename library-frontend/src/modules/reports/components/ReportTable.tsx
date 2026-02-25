interface Props {
  data: any[];
  loading?: boolean;
}

const ReportTable = ({ data, loading }: Props) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        Loading report...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No data available
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-3 text-gray-700">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;