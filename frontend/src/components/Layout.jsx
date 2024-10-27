import React from 'react';
import Header from './Header';

const Layout = ({ logout, children }) => (
  <div className="d-flex flex-column vh-100 mw-100 container .bg-info-subtle">
    <div className="row ">
      <Header onLogoutClick={logout} />
    </div>
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className='class="row h-100 bg-white flex-md-row"'>
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
