import { useEffect, useState } from "react";
import InputForm from "@components/formElements/InputForm";
import { baseURL } from "../static/Api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AdminLoginAction, UserLoginAction, VendorLoginAction } from "../redux/slice/userSlice";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { resetMedicine } from "../redux/slice/medicineSlice";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const navigate = useNavigate();

  const data = useSelector((state) => state?.auth?.LoginData);
  if (data) {
    navigate("/");
  }

  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // vendor email state
  const [vendoremail, setVendorEmail] = useState("");
  const [vendorpassword, setVendorPassword] = useState("");
  // admin email state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await dispatch(
        UserLoginAction({
          email: email,
          password: password,
        })
      );
      if (res.error) {
        setEmail("");
        setPassword("");
        setOpen(true);
        setToastMsg("Invalid Crednetials!");
        setTimeout(() => {
          setOpen(false);
        }, 5000);
        return;
      }
      navigate("/");
      setOpen(true);
      dispatch(resetMedicine());
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    } catch (error) {
      console.log(error, "Some thing went wrong");
    }
  }
  console.log(adminEmail, adminPassword);

  async function handleVendorSubmit(e) {
    e.preventDefault();

    try {
      setVendorEmail("");
      setVendorPassword("");
      const res = await dispatch(
        VendorLoginAction({
          business_email: vendoremail,
          password: vendorpassword,
        })
      );
      console.log(res);
      if (res.error) {
        console.log("check this ", res.error);
        setOpen(true);
        setToastMsg(res.payload);
        setTimeout(() => {
          setOpen(false);
        }, 5000);

        return;
      }
      dispatch(resetMedicine());
      navigate("/dashboard");
    } catch (error) {
      console.log(error, "Some thing went wrong");
    }
  }

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      setVendorEmail("");
      setVendorPassword("");

      const res = await dispatch(
        AdminLoginAction({
          business_email: adminEmail,
          password: adminPassword,
        })
      );
      console.log(res);
      if (res.error) {
        console.log("check this ", res.error);
        setOpen(true);
        setToastMsg(res.payload);
        setTimeout(() => {
          setOpen(false);
        }, 5000);

        return;
      }
      dispatch(resetMedicine());
      navigate("/dashboard");
    } catch (error) {
      console.log(error, "Some thing went wrong");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StoreData = useSelector((state) => state?.auth?.LoginData);
  // console.log(StoreData);

  // const { token } = StoreData?.LoginData;
  // const getToken = localStorage.getItem("token");

  // const checkToken = token === getToken;

  // useEffect(() => {
  //   if (StoreData) {
  //     navigate("/dashboard");
  //   }
  // }, [StoreData]);

  return (
    <div className="container my-5" style={{ height: "50vh" }}>
      <div className="row mx-0" style={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Customer Login" {...a11yProps(0)} />
            <Tab label="Vendor Login" {...a11yProps(1)} />
            <Tab label="Admin Login" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="col-lg-10 mt-3" style={{ display: "flex", gap: "40px" }}>
            <div>
              <div className="mb-2 d-flex justify-content-start align-items-start flex-column">
                <h2 className="text-center mt-2  fw-bold">
                  Customer <span className="text-blue"> Login</span>
                </h2>
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                  <div className="col-12">
                    <InputForm icon={`fa-user`} name="email" isLabel={true} placeholder="Enter Your Email" value={email} label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <InputForm icon={`fa-user`} name="password" isLabel={true} placeholder="Enter Your Password" label="Password" value={password} isPassword={true} isFeildArry={true} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div className="mt-2 d-flex align-items-center justify-content-end mt-2 ">
                    {StoreData?.loading ? (
                      <Button variant="contained" className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center" size="small" disabled color="primary">
                        Please Wait...
                      </Button>
                    ) : (
                      <Button variant="contained" className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center" size="small" type="submit" color="primary">
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4 col-12 d-lg-flex d-none" style={{ flex: 1 }}>
              <img src="assets/images/banner.png" style={{ width: "150%" }} alt="logo" />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="col-lg-10 mt-3" style={{ display: "flex", gap: "40px" }}>
            <div>
              <div className="mb-2 d-flex justify-content-start align-items-start flex-column">
                <h2 className="text-center mt-2  fw-bold">
                  Vendor <span className="text-blue"> Login</span>
                </h2>
              </div>
              <form onSubmit={(e) => handleVendorSubmit(e)}>
                <div className="row">
                  <div className="col-12">
                    <InputForm icon={`fa-user`} name="email" isLabel={true} placeholder="Enter Your Email" value={vendoremail} label="Vendor Email" type="email" onChange={(e) => setVendorEmail(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <InputForm icon={`fa-user`} name="password" isLabel={true} placeholder="Enter Your Password" isPassword={true} label="Password" value={vendorpassword} isFeildArry={true} onChange={(e) => setVendorPassword(e.target.value)} />
                  </div>

                  <div className="mt-2 d-flex align-items-center justify-content-end mt-2 ">
                    {StoreData?.loading ? (
                      <Button variant="contained" className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center" size="small" disabled color="primary">
                        Please Wait...
                      </Button>
                    ) : (
                      <Button variant="contained" className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center" size="small" type="submit" color="primary">
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4 col-12 d-lg-flex d-none" style={{ flex: 1 }}>
              <img src="assets/images/banner.png" style={{ width: "150%" }} alt="logo" />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="col-lg-10 mt-3" style={{ display: "flex", gap: "40px" }}>
            <div>
              <div className="mb-2 d-flex justify-content-start align-items-start flex-column">
                <h2 className="text-center mt-2  fw-bold">
                  Admin <span className="text-blue"> Login</span>
                </h2>
              </div>
              <form onSubmit={(e) => handleAdminSubmit(e)}>
                <div className="row">
                  <div className="col-12">
                    <InputForm icon={`fa-user`} name="email" isLabel={true} placeholder="Enter Your Email" value={adminEmail} label="Admin Email" type="email" onChange={(e) => setAdminEmail(e.target.value)} />
                  </div>
                  <div className="col-12">
                    <InputForm icon={`fa-user`} name="password" isLabel={true} placeholder="Enter Your Password" isPassword={true} label="Password" value={adminPassword} isFeildArry={true} onChange={(e) => setAdminPassword(e.target.value)} />
                  </div>

                  <div className="mt-2 d-flex align-items-center justify-content-end mt-2 ">
                    {StoreData?.loading ? (
                      <Button variant="contained" className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center" size="small" disabled color="primary">
                        Please Wait...
                      </Button>
                    ) : (
                      <Button variant="contained" className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center" size="small" type="submit" color="primary">
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4 col-12 d-lg-flex d-none" style={{ flex: 1 }}>
              <img src="assets/images/banner.png" style={{ width: "150%" }} alt="logo" />
            </div>
          </div>
        </CustomTabPanel>
      </div>
      <Snackbar open={open}>
        <SnackbarContent
          sx={{ backgroundColor: "tomato", height: "50px" }}
          message={
            <p>
              {" "}
              <i className="fa fa-info-circle"></i> {toastMsg}!
            </p>
          }
        />
      </Snackbar>
    </div>
  );
};

export default LoginForm;
