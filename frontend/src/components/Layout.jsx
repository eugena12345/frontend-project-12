import React from 'react';
import Header from './Header';

const Layout = ({ logout, children }) => (
  <div className="container  vh-100 mw-100 d-flex flex-column .bg-info-subtle">
    <div className="row ">
      <Header onLogoutClick={logout} />
    </div>
    <div className="row  m-3 mh-100 h-100">
      <div className="container overflow-hidden rounded shadow flex-row">
        <div className="row flex-md-row">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
