import React from 'react';
import Sidebar from './Sidebar';
import Connect from './Connect';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <Connect></Connect>
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
