import React, { useState, useEffect } from 'react';

const NotificationsBoard = ({ recipient }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Make a POST request to get notifications
        const response = await fetch('http://localhost:8001/getNotificationsByWallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: recipient }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const notificationsData = await response.json();
        setNotifications(notificationsData);

        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [recipient]);

  return (
    <div>
    <p className='ml-10 mt-[3rem] text-3xl'>Notifications</p>
    <div className="overflow-x-auto rounded-lg m-4 ml-10 mr-10">
      <table className="w-full table-auto border-collapse text-center">
        <thead className="text-white">
          <tr>
            <th className="border-b px-4 py-2">Protocol</th>
            <th className="border-b px-4 py-2">Message</th>
            <th className="border-b px-4 py-2">Time Sent</th>
          </tr>
        </thead>
        <tbody className="text-white-700">
          {notifications.map((notification, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                <a>
                  {notification.protocolName}
                </a>
              </td>
              <td className="px-4 py-2">
                <a>
                  {notification.message}
                </a>
              </td>
              <td className="px-4 py-2">
                <a>{notification.timeSent}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  </div>
  );
};

export default NotificationsBoard;
