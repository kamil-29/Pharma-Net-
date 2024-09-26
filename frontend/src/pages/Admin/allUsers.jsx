import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Table from "react-bootstrap/Table";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import axios from "axios";

const AllUsers = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const getAllCustomers = async () => {
    // axious req to get all customers

    try {
      const res = await axios.get("http://localhost:3000/users");
      console.log(res.data);
      if (res.data) {
        setCustomerData(res.data?.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  console.log(customerData);

  return (
    <>
      <Header />
      {loading && <div className="loader-bg wrapper_inner  min-100 "></div>}
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
                  All Customers
                </h5>
              </div>
            </div>

            <div>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {customerData?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No results found.
                        </td>
                      </tr>
                    ) : (
                      <>
                        {customerData &&
                          customerData?.map((elm) => (
                            <tr key={elm?.id} style={{ textAlign: "center" }}>
                              <td>{elm.first_name}</td>
                              <td>{elm.last_name}</td>
                              <td>{elm.email}</td>
                              <td>{elm.phone}</td>
                              <td>{elm.gender}</td>
                              {/* <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "15px",
                                  justifyContent: "center",
                                }}
                              >
                                <i className="fa-solid fa-trash-can" style={{ cursor: "pointer" }} onClick={() => handleDelete(elm?._id)}></i>
                              </td> */}
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
      <Snackbar open={open} autoHideDuration={6000} message="Category Created Successfully!">
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
          message={
            <p>
              <i className="fa fa-info-circle"></i> Category deleted Successfully!
            </p>
          }
        />
      </Snackbar>
    </>
  );
};

export default AllUsers;
