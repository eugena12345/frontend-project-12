import { useFormik } from 'formik';
import axios from 'axios';
import { actions as autorizedActions } from '../slices/auorizeSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Header from './Header';
import { useTranslation } from 'react-i18next';


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    let user = localStorage.getItem('token');
    const [visibilityWarning, setVisibilityWarning] = useState('invisible');
    const warningStyle = `bg-danger text-light p-3 m-1 text-center ${visibilityWarning}`;

    useEffect(() => {
        if (user) {
           // console.log("юзер авторизован");
            navigate('/', { replace: false });
        }
    });

    const formik = useFormik({
        initialValues: {
            floatingInput: '',
            floatingPassword: '',
        },
        onSubmit: (values) => {
          //  console.log(JSON.stringify(values, null, 2));
            const user = { username: values.floatingInput, password: values.floatingPassword }
            axios.post('/api/v1/login', user).then((response) => {
                // console.log(response.data); // => { token: ..., username: 'admin' }
                const currentUser = response.data;
           //     console.log('currentUser', currentUser);
                dispatch(autorizedActions.login({ ...currentUser, id: 1 }));
                navigate('/', { replace: false });
            })
                .catch((error) => {
                 //   console.log(error);
                    if (error.status === 401) {
                        setVisibilityWarning('visible');
                    }
                });
        },
    });
    const goToRegistration = () => {
        navigate('/signup', { replace: false });
    }

    return (
        <div className="">
            <Header />
            < div className="mb-3 " >
                <div className="p-2 ">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <Form onSubmit={formik.handleSubmit}>

                                <Form.Group className="mb-3" controlId="name">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label={t('enterName')}
                                        className="mb-3"
                                    >

                                        <Form.Control type="text" placeholder="Enter name" onChange={formik.handleChange}
                                            value={formik.values.floatingInput} />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <FloatingLabel
                                        controlId="floatingPassword"
                                        label={t('enterPassword')}
                                        className="mb-3"
                                    >
                                        <Form.Control type="password" placeholder="Password" onChange={formik.handleChange}
                                            value={formik.values.floatingPassword} />
                                    </FloatingLabel>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    {t('logIn')}
                                </Button>
                            </Form>
                            <div className="registration" onClick={goToRegistration}>
                                {t('noAccount')} <a href='#' className='text-primary'>{t('registrationHere')}</a>
                            </div>
                            <div className={warningStyle}>{t('serverError.userNotExsist')}</div>

                        </div>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default LoginPage;