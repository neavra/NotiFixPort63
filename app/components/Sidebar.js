import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link href="/">
          <img src="/HomeLogo.svg" alt="Home" />
      </Link>
      <Link href="/marketplace">
          <img src="/MarketPlaceLogo.svg" alt="MarketPlace" />
      </Link>
      <Link href="/settings">
          <img src="/SettingsLogo.svg" alt="Settings" />
      </Link>
      {/* Add more logo buttons as needed */}
      
      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          width: 200px;
          background-color: #1F1D2B;
          padding: 20px;
        }

        a {
          display: block;
          margin-bottom: 20px;
        }

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
