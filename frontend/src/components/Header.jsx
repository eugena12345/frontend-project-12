import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import store from '../store';

const Header = ({ onLogoutClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userToken = store.getState().user?.token || null;

  const logout = () => {
    onLogoutClick();
    navigate('/login', { replace: false });
  };

  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-primary px-4">
      <Link to="/">
        <h2 className="h-2 text-white">{t('hexletChat')}</h2>
      </Link>
      <div className="p-2 ms-auto">
        {userToken && <Button className="btn btn-outline-light" onClick={logout}>{t('logOut')}</Button>}
      </div>
    </Nav>
  );
};

export default Header;
