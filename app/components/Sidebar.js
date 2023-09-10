import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="imgDiv">
        <Link href="/">
            <img src="/HomeLogo.svg" alt="Home" />
        </Link>
      </div>
      <div className="imgDiv">
        <Link href="/marketplace">
            <img src="/MarketPlaceLogo.svg" alt="MarketPlace" className='marketPlaceImg'/>
        </Link>
      </div>
      <div className="imgDiv">
        <Link href="/settings">
            <img src="/SettingsLogo.svg" alt="Settings" />
        </Link>
      </div>
      {/* Add more logo buttons as needed */}
      
      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          width: 5vw;
          background-color: #1F1D2B;
          padding: 20px;
          gap: 10vh;
        }


        a {
          display: block;
          margin-bottom: 20px;
        }

        img {
          width: 5rem;
          height: 5rem;
          object-fit: cover;
        }

        .marketPlaceImg{
          width: 2.5rem;
          height: 2.5rem;
        }

        .imgDiv{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
