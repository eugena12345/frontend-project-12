import { useFormik } from 'formik';
import axios from 'axios';
import { actions as autorizedActions } from '../slices/auorizeSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import * as yup from 'yup';

    
const RegistrationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: yup.object({
            name: yup.string()
                .required('Обязательное поле')
                .min(3, 'Имя должно быть больше 3 занокв')
                .max(20, 'Имя должно быть меньше 20 занокв'),
            password: yup.string()
            .required('Обязательное поле')
            .min(6, 'Пароль должен быть больше 6 символов'),
            repeatPassword: yup.string()
            .required('Обязательное поле')
            .oneOf([yup.ref('password'), null], 'Пароль и подтверждение должны совпадать')
        }),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            const user = { username: values.name, password: values.password }

            axios.post('/api/v1/signup', user)
            .then((response) => {
                console.log(response.data); // => { token: ..., username: 'newuser' }
                const currentUser = response.data;
                console.log('currentUser', currentUser);
                dispatch(autorizedActions.login({ ...currentUser, id: 1 }));
                navigate('/', { replace: false });
              }).catch((error) => {
                console.log(error);
            });
        },
    });

    return (
        <div className="">
            <Header />
            < div className="mb-3 " >
                <div className="p-2">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="name" placeholder="Enter name" onChange={formik.handleChange}
                                        value={formik.values.name} />
                                        <p className='text-danger small'>{formik.errors.name}</p>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={formik.handleChange}
                                        value={formik.values.password} />
                                        <p className='text-danger small'>{formik.errors.password}</p>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="repeatPassword">
                                    <Form.Label>repeat password</Form.Label>
                                    <Form.Control type="password" placeholder="repeat Password" onChange={formik.handleChange}
                                        value={formik.values.repeatPassword} />
                                        <p className='text-danger small'>{formik.errors.repeatPassword}</p>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                           
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
};

export default  RegistrationPage;