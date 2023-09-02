import React, { useState, useEffect } from "react";

const Dashboard = ({walletAddress}) => {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const requestBody = {
      walletAddress: walletAddress,
    };
    useEffect(() => {
      fetch('http://localhost:8001/getSubscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [walletAddress]);
  
    const sortedData = Array.isArray(data)
    ? data.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg m-4">
      <table className="w-full table-auto border-collapse">
        <thead className="text-black bg-gray-100">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2" onClick={() => handleSort("name")}>
              Name{" "}
              {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("description")}>
              Description{" "}
              {sortColumn === "description" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <a>
                  {row.protocolName}
                </a>
              </td>
              <td className="border px-4 py-2">
                <a>{row.protocolDescription}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
