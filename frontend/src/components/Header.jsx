import { Button, Box, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "./Logo";
import { HeaderData, PublicHeaderData, CustomerHeaderData } from "../static/HeaderData";
import { Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

// import { searchMedicine } from "../redux/slice/medicineSlice";
import { setSearchResults } from "../redux/slice/medicineSlice";
import { userLogout, resetLoginLogout } from "../redux/slice/userSlice";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const [show, setShow] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cartOpen, setCartOpen] = React.useState(false);
  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const loginData = useSelector((state) => state.auth.isLogin);
  const userData = useSelector((state) => state.auth.LoginData);
  const logoutData = useSelector((state) => state.auth.isLogout);
  const cartData = useSelector((state) => state.customer.cart);
  console.log("cartData", cartData);
  useEffect(() => {
    // Check if the user is logged in based on your state structure
    if (loginData) {
      setIsUserLoggedIn(true);
      setOpenPopup(true);
      setTimeout(() => {
        setOpenPopup(false);
        dispatch(resetLoginLogout());
      }, 3000);
    }
  }, [loginData]);

  useEffect(() => {
    // Check if the user is logged in based on your state structure
    if (logoutData) {
      setOpenLogoutPopup(true);
      setTimeout(() => {
        setOpenLogoutPopup(false);
        dispatch(resetLoginLogout());
      }, 3000);
    }
  }, [logoutData]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const fetchMedicineData = async () => {
    try {
      const queryParams = searchTerm ? `?medicinename=${searchTerm}` : "";
      const response = await axios.get(`http://localhost:3000/medicine${queryParams}`);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      dispatch(setSearchResults(data));
    } catch (error) {
      console.error("Error fetching medicine data:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchTerm);

    // if (searchTerm === "" || searchTerm === undefined) {
    //   return;
    // }
    fetchMedicineData();
    navigate("/");
  };

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.auth?.LoginData);
  console.error("this is yara ", data);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="carRent_header ">
      {/* <div
        className="d-flex w-100 px-2 carRent_header d-flex justify-content-between   align-items-center "
        data-aos="fade-down"
      > */}
      <div className={`container `}>
        <div className="row h-100 mx-auto  mx-0" data-aos="fade-down">
          <div className="col-lg-3 px-0 col-10 d-flex gap-3 align-items-center">
            <div className="d-lg-none d-flex">
              <i className="fa-solid fa-bars" onClick={handleShow}></i>
            </div>
            <Logo color="text-dark" />
          </div>
          <div className="col-lg-6 px-0 col-6 d-lg-flex d-none align-items-center justify-content-center">
            <div className=" d-lg-flex w-100 h-100    gap-4 justify-content-center  align-items-center">
              {data &&
                data.vendor_name &&
                HeaderData.map(({ pageName, pageLink }, i) => {
                  return (
                    <Link to={pageLink} key={i}>
                      <span className="fw-600 fs-7  nav_links active text-dark">{pageName}</span>
                    </Link>
                  );
                })}
              {data === null &&
                PublicHeaderData.map(({ pageName, pageLink }, i) => {
                  return (
                    <Link to={pageLink} key={i}>
                      <span className="fw-600 fs-7  nav_links active text-dark">{pageName}</span>
                    </Link>
                  );
                })}
              {data &&
                userData?.user_type === "customer" &&
                CustomerHeaderData.map(({ pageName, pageLink }, i) => {
                  return (
                    <Link to={pageLink} key={i}>
                      <span className="fw-600 fs-7  nav_links active text-dark">{pageName}</span>
                    </Link>
                  );
                })}
            </div>
            <form onSubmit={handleSearch}>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input_global" placeholder="Search Now" />
            </form>
            {userData?.user_type === "customer" ? (
              <Button style={{ marginLeft: "1rem" }} variant="contained" className="custom_button d-flex gap-2  align-items-center" size="small" onClick={handleCartOpen} color="primary">
                <i className="fa-solid fa-shopping-cart"></i>
                Cart
              </Button>
            ) : null}

            <Modal open={cartOpen} onClose={handleCartClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <h3
                  style={{
                    marginBottom: "1.2rem",
                    borderBottom: "1px solid gray",
                    padding: "0 0 0.8rem 0",
                  }}
                >
                  <i className="fa-solid fa-shopping-cart"></i> Cart
                </h3>
                <div>
                  <h5>Items:</h5>
                  {cartData.items.length > 0
                    ? cartData.items.map((item) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            borderBottom: "1px solid gray",
                            padding: "0.8rem 0",
                          }}
                        >
                          <p style={{ margin: "0" }}>{item.medicine.medicinename}</p>
                          <p style={{ margin: "0" }}>{item.amount}</p>
                          <p style={{ margin: "0" }}>{item.medicine.price}</p>
                          {/* <span>Remove</span> */}
                        </div>
                      ))
                    : "No item in Cart"}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5 style={{ marginTop: "1.5rem" }}>Total: {cartData.total}</h5>
                    {cartData.items.length > 0 ? (
                      <Button
                        style={{ marginLeft: "1rem", marginTop: "1rem" }}
                        variant="contained"
                        className="custom_button d-flex gap-2  align-items-center"
                        size="small"
                        onClick={() => {
                          navigate("/customer/checkout");
                        }}
                        color="primary"
                      >
                        <i className="fa-solid fa-shopping-cart"></i>
                        Checkout
                      </Button>
                    ) : null}
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className="col-lg-3 d-lg-flex d-none px-0 col-6 d-flex gap-3 align-items-center justify-content-end">
            <div className="d-flex gap-2 align-items-center">
              <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick} variant="contained" className="custom_button d-flex gap-2  align-items-center" size="small" color="primary">
                <i className="fa-solid fa-user"></i>
                Register
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseDropdown}
                // MenuListProps={{
                //   "aria-labelledby": "basic-button",
                // }}
                PaperProps={{ sx: { width: "125px" } }}
              >
                <MenuItem style={{ padding: "0", width: "500px !important" }} onClick={handleCloseDropdown}>
                  <Button
                    variant="contained"
                    className="d-flex gap-2  align-items-center"
                    size="small"
                    onClick={() => {
                      setTimeout(() => {
                        navigate("/customer-register");
                      }, 200);
                    }}
                    color="primary"
                    style={{ width: "92%", margin: "3px auto" }}
                  >
                    <i className="fa-solid fa-user"></i>
                    Customer
                  </Button>
                </MenuItem>
                <MenuItem style={{ padding: "0" }} onClick={handleCloseDropdown}>
                  <Button
                    variant="contained"
                    className="d-flex gap-2  align-items-center"
                    size="small"
                    onClick={() => {
                      setTimeout(() => {
                        navigate("/vendor-register");
                      }, 200);
                    }}
                    color="primary"
                    style={{ width: "92%", margin: "2.5px auto" }}
                  >
                    <i className="fa-solid fa-user"></i>
                    Vendor
                  </Button>
                </MenuItem>
              </Menu>
              {/* <Button
                variant="contained"
                className="custom_button d-flex gap-2  align-items-center"
                size="small"
                onClick={() => navigate("/customer-register")}
                color="primary"
              >
                <i className="fa-solid fa-user"></i>
                Customer
              </Button>
              <Button
                variant="contained"
                className="custom_button d-flex gap-2  align-items-center"
                size="small"
                onClick={() => navigate("/vendor-register")}
                color="primary"
              >
                <i className="fa-solid fa-user"></i>
                Vendor
              </Button> */}

              {data === null ? (
                <Button variant="contained" className="custom_button d-flex gap-2  align-items-center" size="small" onClick={() => navigate("/login")} color="primary">
                  <i className="fa-solid fa-user"></i>
                  Login
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="custom_button d-flex gap-2  align-items-center"
                  size="small"
                  onClick={() => {
                    dispatch(userLogout());
                    navigate("/");
                  }}
                  color="secondary"
                >
                  <i className="fa-solid fa-user"></i>
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-lg-none d-flex">
        <Offcanvas show={show} className="w-75" onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Logo color="text-dark" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex w-100 flex-column  gap-4 justify-content-center  align-items-start">
              {HeaderData.map(({ pageName, pageLink }, i) => {
                return (
                  <Link to={pageLink} key={i} onClick={handleClose}>
                    <span className="fw-600 fs-7 text-dark">{pageName}</span>
                  </Link>
                );
              })}
            </div>
            <div className="d-flex mt-3 gap-2 align-items-center">
              <Button variant="contained" className="custom_button d-flex gap-2  align-items-center" size="small" onClick={() => navigate("/customer-register")} color="primary">
                <i className="fa-solid fa-user"></i>
                Customer
              </Button>
              <Button variant="contained" className="custom_button d-flex gap-2  align-items-center" size="small" onClick={() => navigate("/vendor-register")} color="primary">
                <i className="fa-solid fa-user"></i>
                Vendor
              </Button>
              <Button
                variant="contained"
                className="custom_button d-flex gap-2  align-items-center"
                size="small"
                onClick={() => {
                  navigate("/");
                }}
                color="primary"
              >
                <i className="fa-solid fa-user"></i>
                Login
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <Snackbar open={openPopup} autoHideDuration={6000} message="Category Deleted Successfully!">
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
          message={
            <p>
              {" "}
              <i className="fa fa-info-circle"></i> Logged-in Successfully!
            </p>
          }
        />
      </Snackbar>
      <Snackbar open={openLogoutPopup} autoHideDuration={6000} message="Category Deleted Successfully!">
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
          message={
            <p>
              {" "}
              <i className="fa fa-info-circle"></i> Logged-out Successfully!
            </p>
          }
        />
      </Snackbar>
    </div>
  );
};

export default Header;
