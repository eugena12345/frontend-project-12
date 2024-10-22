/* eslint-disable no-undef */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>

      <Form.Group className="mb-3" controlId="name">
        <FloatingLabel
          controlId="username"
          label={t('enterNik')}
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder={t('enterNik')}
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
      {formik.errors.password
      && <p className="bg-danger text-light p-3 m-1 text-center">{formik.errors.password}</p>}
      <Button variant="primary" type="submit">
        {t('logIn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
