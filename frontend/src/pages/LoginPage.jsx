import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import { actions as autorizedActions } from '../store/slices/auth';
import { postNewUser } from '../servises/api';
import errors from '../servises/errorCodes';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = async (values, actions) => {
    const newUser = { username: values.username, password: values.password };
    try {
      const { data } = await postNewUser(newUser);
      const currentUser = data;
      dispatch(autorizedActions.login({ ...currentUser, id: currentUser.token }));
      navigate('/', { replace: false });
    } catch (error) {
      if (error.status === errors.userNotExsist) {
        actions.setFieldError('password', t('serverError.userNotExsist'));
      }
    }
  };

  return (
    <Layout>
      <div className="mb-3 ">
        <div className="p-2 ">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <LoginForm onSubmit={login} />
              <div className="registration">
                {t('noAccount')}
                {' '}
                <p className="text-primary">
                  {' '}
                  <Link to="/signup">
                    {t('registrationHere')}
                  </Link>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
