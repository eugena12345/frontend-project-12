import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import { actions as autorizedActions } from '../slices/auorizeSlice';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [visibilityWarning, setVisibilityWarning] = useState('invisible');
  const warningStyle = `bg-danger text-light p-3 m-1 text-center ${visibilityWarning}`;

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('validationError.required'))
        .min(3, t('validationError.minNameLength'))
        .max(20, t('validationError.maxNameLength')),
      password: yup.string()
        .required(t('validationError.required'))
        .min(6, t('validationError.minPswLength')),
      repeatPassword: yup.string()
        .required(t('validationError.required'))
        .oneOf([yup.ref('password'), null], t('validationError.matchPsw')),
    }),
    onSubmit: (values) => {
      const user = { username: values.name, password: values.password };

      axios.post('/api/v1/signup', user)
        .then((response) => {
          const currentUser = response.data;
          dispatch(autorizedActions.login({ ...currentUser, id: 1 }));
          navigate('/', { replace: false });
        }).catch((error) => {
          if (error.status === 409) {
            setVisibilityWarning('visible');
          }
        });
    },
  });

  return (
    <div className="">
      <Header />
      <div className="mb-3 ">
        <div className="p-2">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>{t('enterName')}</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={t('enterName')}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <p className="text-danger small">{formik.errors.name}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('enterPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('enterPassword')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <p className="text-danger small">{formik.errors.password}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="repeatPassword">
                  <Form.Label>{t('repeatPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('repeatPassword')}
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                  />
                  <p className="text-danger small">{formik.errors.repeatPassword}</p>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {t('register')}
                </Button>
                <div className={warningStyle}>{t('serverError.userExsist')}</div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
