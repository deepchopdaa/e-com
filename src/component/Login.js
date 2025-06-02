import React from 'react'
import { Form, Field, Formik, ErrorMessage } from "formik"
import * as yup from "yup"
const Login = () => {
    const validationSchema = yup.object({
        email: yup.string().required("Email Is Required !"),
        password: yup.string().required("Password is required !")
    })
    return (
        <div>
            <Formik initialValues={{ email: "", password: "" }} validationSchema={ validationSchema} onSubmit={(values) => {
                console.log("from Data = ", values)
            }}>
                <Form>
                    <label>Email : </label>
                    <Field type="email" name="email" />
                    <ErrorMessage name='email' component="div" />
                    <label>Password : </label>
                    <Field type="password" name="password" />
                    <ErrorMessage name='password' component="div" />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div >
    )
}

export default Login
