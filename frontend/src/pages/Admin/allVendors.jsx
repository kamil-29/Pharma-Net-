import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Table from "react-bootstrap/Table";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { AlertHeading } from "react-bootstrap";

const AllVendors = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendorsData, setVendorData] = useState([]);
  const getAllCustomers = async () => {
    // axious req to get all customers

    try {
      const res = await axios.get("http://localhost:3000/vendors");
      console.log(res.data);
      if (res.data) {
        setVendorData(res.data?.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const verifyVendor = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/vendors/${id}/verify`);
      console.log(res);
      if (res.data) {
        setOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
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
                  All Vendors Data
                </h5>
              </div>
            </div>

            <div>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Business Email</th>
                    <th>Vendor Name</th>
                    <th>Account status</th>
                    <th>View Details</th>
                    <th>Verify</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {vendorsData?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No results found.
                        </td>
                      </tr>
                    ) : (
                      <>
                        {vendorsData &&
                          vendorsData?.map((elm) => (
                            <tr key={elm?.id} style={{ textAlign: "center" }}>
                              <td>{elm.first_name}</td>
                              <td>{elm.last_name}</td>
                              <td>{elm.business_email}</td>
                              <td>{elm.vendor_name}</td>
                              <td>
                                <span style={{ backgroundColor: elm.account_status === "pending" ? "red" : "green", color: "white", padding: "5px 10px", borderRadius: "5px" }}>{elm.account_status}</span>
                              </td>
                              <td>
                                <Link
                                  to={`/vendor/details/${elm._id}`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    justifyContent: "center",
                                  }}
                                >
                                  <i className="fa-solid fa-edit" style={{ cursor: "pointer" }} onClick={() => handleDelete(elm?._id)}></i>
                                </Link>
                              </td>
                              <td>
                                {elm.account_status === "pending" ? (
                                  <button
                                    onClick={() => verifyVendor(elm._id)}
                                    style={{
                                      backgroundColor: "#4CAF50",
                                      color: "white",
                                      width: "80px",
                                      padding: "1px 4px",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      display: "inline-block",
                                      fontSize: "12px",
                                      cursor: "pointer",
                                      border: "none",
                                    }}
                                  >
                                    Verify
                                  </button>
                                ) : (
                                  "Already Verified"
                                )}
                              </td>
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
              <i className="fa fa-info-circle"></i> Vendor Verified Sucessfully!
            </p>
          }
        />
      </Snackbar>
    </>
  );
};

export default AllVendors;
