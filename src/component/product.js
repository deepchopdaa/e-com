import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from "yup"
import { Button, Table } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

const Home = () => {
    const [products, setproducts] = useState([])
    const [categorys, setcategorys] = useState([])
    const [id, setid] = useState(null)
    const [pname, setpname] = useState(null)
    const [pdec, setpdec] = useState(null)
    const [pprice, setpprice] = useState(null)
    const [pcategory, setpcategory] = useState(null)
    const [pstoke, setpstoke] = useState(null)
    const [pbrand, setpbrand] = useState(null)
    const [pimage, setpimage] = useState(null)
    const [did, setdid] = useState(null)
    const [update, setupdate] = useState(false)

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const Getpro = () => {
        axios.get("http://localhost:3000/product/get").then((product) => {
            console.log(product.data)
            setproducts(product.data)
        }).catch((e) => {
            console.log("Product Data Getting", e)
        })
    }
    const GetCat = () => {
        axios.get("http://localhost:3000/category/get").then((product) => {
            console.log(product.data)
            setcategorys(product.data)
        }).catch((e) => {
            console.log("Product Data Getting", e)
        })
    }
    useState(() => {
        Getpro()
        GetCat()
    }, [])
    const handleupdate = (item) => {
        setid(item._id)
        setpname(item.name)
        setpdec(item.description)
        setpprice(item.price)
        setpcategory(item.category)
        setpstoke(item.stoke)
        setpimage(item.image)
        setpbrand(item.brand)
        setupdate(true)
        handleShow()
    }
    const UpdateRecord = async (formdata) => {
        await axios.put(`http://localhost:3000/product/update/${id}`, formdata).then((data) => {
            console.log(data.data)
            alert("Product update Sucessfully")
            Getpro()
        }).catch((e) => {
            console.log("Product update Error", e)
            alert("Product update Error", e)
        })
    }
    const Addrecord = async (formdata) => {
        await axios.post("http://localhost:3000/product/add", formdata
        ).then((data) => {
            console.log(data.data)
            alert("Product Added Sucessfully")
            handleClose()
            Getpro()
        }).catch((e) => {
            console.log("Product Add Error", e)
            alert("Product Add Error", e)
        })
    }
    const handledelete = () => [
        axios.delete(`http://localhost:3000/product/delete/${did}`).then((data) => {
            console.log(data.data);
            console.log("Deleted Sucessfully")
            handleClose1()
            Getpro()
        }).catch((e) => {
            console.log("Delete Error", e)
        })
    ]
    const init = {
        name: pname || "",
        description: pdec || "",
        price: pprice || "",
        image: pimage || "",
        category: pcategory || "",
        stoke: pstoke || "",
        brand: pbrand || ""
    }

    const validationSchema = yup.object({
        name: yup.string().required("name is requried"),
        description: yup.string().required("description is requried"),
        price: yup.string().required("price is requried"),
        image: yup.string().required("image is requried"),
        stoke: yup.string().required("stoke is requried"),
        category: yup.string().required("Category is required"),
        brand: yup.string().required("brand is required")
    })
    const handleDelete = (id) => {
        setdid(id)
        handleShow1()
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>category</th>
                        <th>brand</th>
                        <th>Stoke</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                {<td>{item.image.map((url) => (
                                    <img src={`http://localhost:3000/${url}`} height="100px" style={{ margin: "5px" }} />
                                ))}</td>}
                                <td>{item.category?.name || "No category"}</td>
                                <td>{item.brand}</td>
                                <td>{item.stoke}</td>
                                <td><Button onClick={() => handleupdate(item)}>Update</Button></td>
                                <td><Button onClick={() => handleDelete(item._id)}>Delete</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            {/* bootsrap model */}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Product heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={init}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            console.log("form Data = ", values)
                            const formdata = new FormData
                            formdata.append("name", values.name)
                            formdata.append("description", values.description)
                            formdata.append("price", values.price)
                            for (let i = 0; i < values.image.length; i++) {
                                formdata.append("image", values.image[i]); // 'images' matches backend field name
                            }
                            formdata.append("stoke", values.stoke)
                            formdata.append("category", values.category)
                            formdata.append("brand", values.brand)

                            console.log(formdata, "formdata  formdata ")
                            if (update !== false) {
                                console.log("Update block execute !")
                                UpdateRecord(formdata)
                            } else {
                                console.log("Add block execute !")
                                Addrecord(formdata)
                            }
                        }}>
                        {({ setFieldValue }) => (
                            <Form>
                                <label>Name :</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name='name' component='div' />
                                <label> Description:</label>
                                <Field type="text" name="description" />
                                <ErrorMessage name='description' component='div' />
                                <label>price :</label>
                                <Field type="text" name="price" />
                                <ErrorMessage name='price' component='div' />
                                <label>Image:</label>
                                <input
                                    type="file"
                                    name="image"
                                    multiple
                                    accept="image/*"
                                    onChange={(event) => {
                                        setFieldValue("image", event.currentTarget.files); // This is a FileList
                                    }}
                                />

                                <ErrorMessage name="image" component="div" className="error" />
                                <label>category :</label>
                                <Field as="select" name='category'>
                                    <option>select category</option>
                                    {
                                        categorys?.map((cat) => (
                                            <option value={cat._id} key={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name='category' component='div' />
                                <label>brand :</label>
                                <Field type="text" name="brand" />
                                <ErrorMessage name='brand' component='div' />
                                <label>stoke :</label>
                                <Field type="text" name="stoke" />
                                <ErrorMessage name='stoke' component='div' />
                                <Button type='submit'>
                                    Submit
                                </Button>
                            </Form>)}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* delete model */}
            <Modal show={show1} onHide={handleClose1} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handledelete}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Home
