import { useFormik } from 'formik';


const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">UserName</label>
            <input
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default LoginPage;