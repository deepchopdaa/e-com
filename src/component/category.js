import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState(null);
    const [cname, setCname] = useState(null);
    const [cimage, setCimage] = useState(null);
    const [update, setUpdate] = useState(false);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [did, setDid] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getCategories = () => {
        axios.get("http://localhost:3000/category/get").then((res) => {
            setCategories(res.data);
        }).catch((e) => console.log("Category Fetch Error", e));
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleUpdate = (item) => {
        setId(item._id);
        setCname(item.name);
        setCimage(item.image);
        setUpdate(true);
        handleShow();
    };

    const handleDelete = (id) => {
        setDid(id);
        handleShow1();
    };

    const deleteCategory = () => {
        axios.delete(`http://localhost:3000/category/delete/${did}`).then(() => {
            handleClose1();
            getCategories();
        }).catch((e) => console.log("Delete Error", e));
    };

    const init = {
        name: cname || "",
        image: ""
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        image: yup.mixed().required("Image is required")
    });

    const addOrUpdateCategory = async (values) => {
        console.log("Form Data Values=",values)
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image);

        if (update) {
            await axios.put(`http://localhost:3000/category/update/${id}`, formData)
                .then(() => {
                    alert("Category updated successfully");
                    setUpdate(false);
                    getCategories();
                    handleClose();
                }).catch((e) => alert("Update Error", e));
        } else {
            await axios.post("http://localhost:3000/category/add", formData)
                .then(() => {
                    alert("Category added successfully");
                    getCategories();
                    handleClose();  
                }).catch((e) => alert("Add Error", e));
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add Category</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat._id}>
                            <td>{cat.name}</td>
                            <td><img src={`http://localhost:3000/${cat.image}`} alt={cat.name} height="80" /></td>
                            <td><Button onClick={() => handleUpdate(cat)}>Update</Button></td>
                            <td><Button onClick={() => handleDelete(cat._id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{update ? "Update Category" : "Add Category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={init}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={addOrUpdateCategory}>
                        {({ setFieldValue }) => (
                            <Form>
                                <label>Name:</label>
                                <Field type="text" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />

                                <label>Image:</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                                    accept="image/*"
                                />
                                <ErrorMessage name="image" component="div" className="text-danger" />
                                <br />
                                <Button type="submit">{update ? "Update" : "Add"}</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>Cancel</Button>
                    <Button variant="danger" onClick={deleteCategory}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Category;
