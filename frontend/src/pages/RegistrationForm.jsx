import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import React from 'react';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegistrationForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
      other: null,
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
    onSubmit,
  });

  return (
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
      <Form.Group controlId="other">
        {
          formik.errors.other
          && <p className="bg-danger text-light p-3 m-1 text-center">{formik.errors.other}</p>
        }
      </Form.Group>

      <Button variant="primary" type="submit">
        {t('register')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
