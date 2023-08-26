import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main>{children}</main>

      <style jsx>{`
        .layout {
          display: flex;
          background-color: #252836;
          color: white;
        }
        
        main {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default Layout;
