import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import { actions as autorizedActions } from '../store/slices/auorizeSlice';
import { postNewUser } from '../servises/api';
import errors from '../servises/errorCodes';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToRegistration = () => {
    navigate('/signup', { replace: false });
  };

  const login = (values, actions) => {
    const newUser = { username: values.username, password: values.password };
    postNewUser(newUser)
      .then((response) => {
        const currentUser = response.data;
        console.log('currentUser', currentUser);
        dispatch(autorizedActions.login({ ...currentUser, id: currentUser.token }));
        navigate('/', { replace: false });
      })
      .catch((error) => {
        if (error.status === errors.userNotExsist) {
          actions.setFieldError('password', t('serverError.userNotExsist'));
        } else if (axios.isAxiosError(error)) {
          toast(t('notify.networkError'));
        }
      });
  };

  return (
    <Layout>
      <div className="mb-3 ">
        <div className="p-2 ">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <LoginForm onSubmit={login} />
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
             jsx-a11y/no-static-element-interactions */}
            <div className="registration" onClick={goToRegistration}>
              {t('noAccount')}
              {' '}
              <p className="text-primary">
                {' '}
                <u>{t('registrationHere')}</u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
