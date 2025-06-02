import React from 'react'
import { Formik, Field, ErrorMessage, Form } from "formik"
import * as yup from "yup"
import axios from "axios"

const Register = () => {
    const validationSchema = yup.object({
        name: yup.string().required("Email Is Required !"),
        email: yup.string().required("Email Is Required !"),
        password: yup.string().min(8).max(8).required("Password is required !"),
        isAdmin: yup.boolean()
    })

    const Handlesubmit = async (values) => {
        console.log("form data = ", values)
        await axios.post("http://localhost:3000/user/register", values).then((data) => {
            console.log(data);
            alert("Register successfullly")
        }).catch((e) => {
            console.log("register error", e);
            alert("Register Error", e)
        })
    }
    return (
        <div>
            <Formik initialValues={{ name: "", email: "", password: "", isAdmin: false }} validationSchema={validationSchema} onSubmit={Handlesubmit}>
                <Form>
                    <label>Name : </label>
                    <Field type="text" palceholder="Enter the Your Name" name="name" />
                    <ErrorMessage name='name' component="div" />
                    <label>Email : </label>
                    <Field type="email" palceholder="yourname1@gmail.com" name="email" />
                    <ErrorMessage name='email' component="div" />
                    <label>Password : </label>
                    <Field type="password" name="password" min="8" max="8" />
                    <ErrorMessage name='password' component='div' />
                    <label>isAdmin : </label>
                    <Field type="checkbox" name="isAdmin" />
                    <ErrorMessage name='isAdmin' component="div" />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div >
    )
}

export default Register
