import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Layout from '../components/Layout';
import RegistrationForm from '../components/RegistrationForm';
import { actions as autorizedActions } from '../store/slices/auth';
import { registrateNewUser } from '../servises/api';
import errors from '../servises/errorCodes';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const registrateUser = (values, actions) => {
    const user = { username: values.name, password: values.password };

    registrateNewUser(user)
      .then((response) => {
        const currentUser = response.data;
        dispatch(autorizedActions.login({ ...currentUser, id: currentUser.token }));
        navigate('/', { replace: false });
      }).catch((error) => {
        if (error.status === errors.userExist) {
          actions.setFieldError('other', t('serverError.userExsist'));
        }
      });
  };

  return (
    <Layout>
      <div className="mb-3 ">
        <div className="p-2">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <RegistrationForm onSubmit={registrateUser} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
