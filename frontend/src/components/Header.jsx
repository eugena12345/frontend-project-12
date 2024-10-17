/* eslint-disable react/prop-types */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { actions as autorizedActions } from '../store/slices/auorizeSlice';

const Header = ({ onLogoutClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userToken = localStorage.getItem('token');

  const logout = () => {
    onLogoutClick();
    dispatch(autorizedActions.logout());
  };

  const goToMainPage = () => {
    navigate('/', { replace: false });
  };
  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-primary px-4">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
       jsx-a11y/no-noninteractive-element-interactions */}
      <h2 className="h-2 text-white" onClick={goToMainPage}>Hexlet chat</h2>
      <div className="p-2 ms-auto">
        {userToken && <Button className="btn btn-outline-light" onClick={logout}>{t('logOut')}</Button>}
      </div>
    </Nav>
  );
};

export default Header;
