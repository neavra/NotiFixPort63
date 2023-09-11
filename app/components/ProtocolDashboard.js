import React, { useState, useEffect } from "react";

const ProtocolDashboard = ({walletAddress}) => {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const requestBody = {
      walletAddress: walletAddress,
    };
    useEffect(() => {
      fetch('http://localhost:8001/getSubscriptionsByWallet', {
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

  const users = ['F3LYMMIT5TTCPJJGLS7RQ5BQA6LMOFVTRPRA5QQTR4KEJWP5XNBCNYM65Q', 'JSCXVRMRFUMK6QD4LZKI5JLFY5NNRCVPXRTXVSJRFRJDVEXZSBAOTOCDTI']

  return (
    <div className="overflow-x-auto rounded-lg m-4 ml-10 mr-10">
      <p className='text-3xl'>Subscribers</p>
      <table className="w-full table-auto border-collapse text-left">
        <thead className="text-white">
          <tr>
            <th className="border-b py-2">
              Users
            </th>
          </tr>
        </thead>
        <tbody className="text-white-700">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="py-2">
                <a>
                  {user}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='mt-[2rem] text-1xl'>{users.length} users are currently subscribed</p>
    </div>
  );
  
};

export default ProtocolDashboard;
