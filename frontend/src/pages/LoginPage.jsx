import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { actions as autorizedActions } from '../store/slices/auorizeSlice';
import { postNewUser } from '../servises/api';
import errors from '../servises/errorCodes';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, actions) => {
      const newUser = { username: values.username, password: values.password };
      postNewUser(newUser)
        .then((response) => {
          const currentUser = response.data;
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
    },
  });
  const goToRegistration = () => {
    navigate('/signup', { replace: false });
  };

  return (
    <div className="">
      <Header />
      <div className="mb-3 ">
        <div className="p-2 ">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <Form onSubmit={formik.handleSubmit}>

                <Form.Group className="mb-3" controlId="name">
                  <FloatingLabel
                    controlId="username"
                    label={t('enterName')}
                    className="mb-3"
                  >

                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />

                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    controlId="password"
                    label={t('enterPassword')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </FloatingLabel>
                </Form.Group>
                {
                  formik.errors.password
                  && <p className="bg-danger text-light p-3 m-1 text-center">{formik.errors.password}</p>
                }

                <Button variant="primary" type="submit">
                  {t('logIn')}
                </Button>
              </Form>

              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
               jsx-a11y/no-static-element-interactions */}
              <div className="registration" onClick={goToRegistration}>
                {t('noAccount')}
                {' '}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <p className="text-primary"><u>{t('registrationHere')}</u></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
