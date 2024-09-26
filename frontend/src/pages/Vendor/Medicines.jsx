import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  medicinedetails,
  deletemedicineDetails,
} from "../../redux/slice/medicineSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

// Form Schema

const FormSchema = Yup.object({
  medicinename: Yup.string().required("Medicine Name is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.string().required("Price is Required"),
  image: Yup.string().required("Image is Required"),
});

const Medicines = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeMed, setActiveMed] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [myId, setMYID] = useState("");
  const user = useSelector((state) => state.auth.LoginData);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchMedicineData = async () => {
    try {
      const queryParams = searchTerm ? `?medicinename=${searchTerm}` : "";
      const response = await axios.get(
        `http://localhost:3000/medicine${queryParams}`
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      const filteredData = data.filter((item) => item.vendorID === user._id);
      setMedicineList(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching medicine data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMedicineData();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetails = async (id, elm) => {
    try {
      dispatch(medicinedetails(id));

      console.log(id);
      setMYID(id);
      setActiveMed(elm);

      // Open the modal
      handleShow();
    } catch (error) {
      console.error("Error fetching medicine details:", error);
    }
  };

  const handleDelete = (id) => {
    dispatch(deletemedicineDetails(id))
      .then(() => {
        console.log("Category Deleted");
        // After successful deletion, fetch the updated category list
        fetchMedicineData();
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        // Handle error if needed
      });
  };

  const { medicineDetails } = useSelector((state) => state?.medicine);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9 h-100">
            <div className="p-3 bg-white g_border_radius">
              <div>
                <h5 className="fw-bold d-flex gap-2 align-items-center mb-0">
                  <i className="fa-solid fa-hospital"></i>
                  All Medicines
                </h5>
              </div>
            </div>
            <div className="mt-3">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="mt-3">
              <Table striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>#</th>
                    <th>Medicine Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        LOADING...
                      </td>
                    </tr>
                  ) : (
                    <>
                      {medicineList.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No results found.
                          </td>
                        </tr>
                      ) : (
                        <>
                          {medicineList.map((elm) => (
                            <tr key={elm?.id} style={{ textAlign: "center" }}>
                              <td>{elm?.id?.slice(0, 5)}</td>
                              <td>{elm?.medicinename}</td>
                              <td>
                                <img
                                  src={elm?.image}
                                  alt={elm.medicinename}
                                  style={{
                                    borderRadius: "50%",
                                    margin: "auto",
                                    width: "50px",
                                    display: "flex",
                                  }}
                                />
                              </td>
                              <td>{elm?.description}</td>
                              <td>{elm?.price}</td>
                              <td>{elm?.stock}</td>

                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "15px",
                                  justifyContent: "center",
                                  height: "10vh",
                                }}
                              >
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDetails(elm?._id, elm)}
                                ></i>
                                <i
                                  className="fa-solid fa-trash-can"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(elm?._id)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal start */}
      <Formik
        enableReinitialize={true}
        initialValues={{
          medicinename: activeMed?.medicinename || "",
          description: activeMed?.description || "",
          price: activeMed?.price || "",
        }}
        onSubmit={(values) => {
          console.log("Formik Values:", values);

          axios({
            method: "PUT",
            url: `http://localhost:3000/medicine/${myId}`,
            data: {
              medicinename: values?.medicinename,
              description: values?.description,
              price: values?.price,
              stock: values?.stock,
            },
          })
            .then((res) => {
              console.log(`Updated`, res?.data);

              window.alert("Your Medicine Updated");
              handleClose();
              fetchMedicineData();
            })
            .catch((err) => console.log(err));
        }}

        // })
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="medicinename"
                    id="medicinename"
                    placeholder="Update Your Medicine Name"
                    value={values.medicinename}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.medicinename && errors.medicinename && (
                    <div style={{ color: "red" }}>{errors.medicinename}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Medicine Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Update Your Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.description && (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Medicine Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Update Your Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.price && errors.price && (
                    <div style={{ color: "red" }}>{errors.price}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Stock</Form.Label>
                  <Form.Control
                    type="text"
                    name="stock"
                    id="stock"
                    placeholder="Update Your Stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.stock && errors.stock && (
                    <div style={{ color: "red" }}>{errors.stock}</div>
                  )}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        )}
        {/* modal end */}
      </Formik>

      <Snackbar open={open}>
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
          message={<p>Medicine deleted Successfully!</p>}
        />
      </Snackbar>
    </>
  );
};

export default Medicines;
