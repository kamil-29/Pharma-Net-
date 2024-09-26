import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  CategotyListAction,
  deletecategoryDetails,
} from "../../redux/slice/CategorySlice";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const statusList = [
  {
    value: "confirmed",
    option: "Confirmed",
  },
  {
    value: "ready_for_delivery",
    option: "Ready for Delivery",
  },
  {
    value: "item_on_the_way",
    option: "Item on the Way",
  },
  {
    value: "delivered",
    option: "Delivered",
  },
  {
    value: "refunded",
    option: "Refunded",
  },
  {
    value: "scheduled",
    option: "Scheduled",
  },
];

function formatStatus(status) {
  // Split the string by underscores
  const words = status.split("_");

  // Capitalize each word and remove underscores
  const formattedWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return formattedWords;
}

const Orders = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const user = useSelector((state) => state.auth.LoginData);
  const [ordersList, setOrdersList] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [show, setShow] = useState(false);
  const [myId, setMYID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getOrders();
  }, [dispatch]);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/orders/${String(user._id)}`
      );
      setOrdersList(response.data.filteredOrders);
      //   console.log("Orders LIST:", response.data);
      return; // Return the data received from the server if needed
    } catch (error) {
      //   console.error("Error fetching order:", error);
      throw error; // Throw the error for handling in the calling component
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/order/${String(id)}`
      );
      getOrders();
      setToastMsg("Order deleted!");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
      //   console.log("Orders LIST:", response.data);
      return; // Return the data received from the server if needed
    } catch (error) {
      //   console.error("Error fetching order:", error);
      throw error; // Throw the error for handling in the calling component
    }
  };

  const handleEdit = async (id) => {
    try {
      setMYID(id);
      handleShow();
    } catch (error) {
      console.error("Error fetching medicine details:", error);
    }
  };

  const data = useSelector((state) => state?.category);

  console.log(data);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:3000/order/${myId}`,
      data: {
        status: statusUpdate,
      },
    })
      .then((res) => {
        console.log(`Updated`, res?.data);

        setToastMsg("Order status updated!");
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 4000);
        handleClose();
        getOrders();
      })
      .catch((err) => console.log(err));
  };

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
                  Orders List
                </h5>
              </div>
            </div>

            <div>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>#</th>
                    <th
                      style={{
                        width: "210px",
                        textAlign: "left",
                        paddingLeft: "1.5rem",
                      }}
                    >
                      Medicines
                    </th>
                    <th>Address</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {ordersList?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No results found.
                        </td>
                      </tr>
                    ) : (
                      <>
                        {data &&
                          ordersList?.map((elm, index) => (
                            <tr
                              key={elm?.orderID}
                              style={{ textAlign: "center" }}
                            >
                              <td>{index}</td>
                              <td>
                                <ul>
                                  {elm?.medicines.map((item) => (
                                    <li
                                      style={{
                                        textAlign: "left",
                                      }}
                                    >
                                      <span>{item.medicine.medicinename}</span>{" "}
                                      (
                                      <span
                                        style={{
                                          fontSize: "0.8rem",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {item.amount}
                                      </span>
                                      )
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td>{elm?.address}</td>
                              <td>{elm?.customerName}</td>
                              <td>{elm?.total} rs</td>
                              <td>{formatStatus(elm?.status)}</td>

                              <td>
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "0.75rem",
                                  }}
                                  onClick={() => handleEdit(elm?.orderID)}
                                ></i>
                                <i
                                  className="fa-solid fa-trash-can"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(elm?.orderID)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                  </>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal start */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                {statusList &&
                  statusList?.map((elm, index) => (
                    <option value={elm?.value} key={index}>
                      {elm?.option}
                    </option>
                  ))}
              </Form.Select>
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

      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Category Created Successfully!"
      >
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
          message={
            <p>
              <i className="fa fa-info-circle"></i> {toastMsg}
            </p>
          }
        />
      </Snackbar>
    </>
  );
};

export default Orders;
