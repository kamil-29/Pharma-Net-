import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import InputForm from "@components/formElements/InputForm";
import SelectForm from "../components/formElements/SelectForm";
import { baseURL } from "../static/Api";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "@mui/material/Alert";
import { GridCheckIcon } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import { first } from "lodash";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import AccountCircle from "@mui/icons-material/AccountCircle";
const cities = [
  { value: "Karachi", label: "<AccountCircle />" },
  { value: "Islamabad", label: "Islamabad" },
];
const CustomerRegister = () => {
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formRef = useRef();

  const formData = {};
  const navigate = useNavigate();
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setGender("");
    setCity("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (firstName.length < 3) {
      setToastMsg("In-Valid Input, Firstname should be greater than 3!");
      setOpen(true);
      formRef.current.reset();
      setTimeout(() => {
        setOpen(false);
      }, 5000);
      resetForm();
      return;
    }
    if (lastName.length < 3) {
      setToastMsg("In-Valid Input, Lastname should be greater than 3!");
      setOpen(true);
      formRef.current.reset();
      setTimeout(() => {
        setOpen(false);
      }, 5000);
      resetForm();
      return;
    }
    if (phone.length < 11) {
      setToastMsg("Enter Valid Phone Number!");
      setOpen(true);
      formRef.current.reset();
      setTimeout(() => {
        setOpen(false);
      }, 5000);
      resetForm();
      return;
    }
    if (password !== confirmPassword) {
      setToastMsg("In-Valid Input, Password & Confirm Password not Match!");
      setOpen(true);
      formRef.current.reset();
      setTimeout(() => {
        setOpen(false);
      }, 5000);
      resetForm();
      return;
    }
    formData["first_name"] = firstName;
    formData["last_name"] = lastName;
    formData["phone"] = phone;
    formData["address"] = city;
    formData["gender"] = gender;
    formData["email"] = email;
    formData["password"] = password;
    formData["confirm_password"] = confirmPassword;

    console.log(JSON.stringify(formData));
    const data = JSON.stringify(formData);
    const request = await fetch(baseURL + "/users", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    console.log("response", response);
    if (request.status == "200") {
      setToastMsg("Customer registered Successfully!");
      resetForm();
    } else {
      setToastMsg("Error! " + response.message);
    }
    setOpen(true);
    formRef.current.reset();
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  function handleChange(e) {
    formData[e.target.name] = e.target.value;
  }

  const ALPHA_REGEX = /^[A-Za-z]+$/;
  const NUM_REGEX = /^[0-9]+$/;

  return (
    <div className="container mt-5">
      <div className="row mx-0  align-items-center">
        <div className="col-lg-8   mt-3">
          <div className="mb-2 d-flex justify-content-start align-items-start flex-column">
            <h2 className="text-center mt-2  fw-bold">
              Customer <span className="text-blue"> Registration</span>
            </h2>
            <p className="text-faded fs-7">
              Joining our platform opens doors to a world of possibilities,
              where you can explore, shop, and discover new healthcare solutions
              tailored to your needs. Our seamless registration process ensures
              a hassle-free experience, allowing you to begin your journey
              towards improved health and wellness in no time.
            </p>
          </div>
          <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-lg-6">
                <InputForm
                  error
                  icon={`fa-user`}
                  type="text"
                  name="first_name"
                  isLabel="First Name"
                  placeholder="First Name"
                  label="First Name"
                  value={firstName}
                  isFeildArry={true}
                  required
                  onChange={(e) => {
                    if (
                      ALPHA_REGEX.test(e.target.value) ||
                      e.target.value == ""
                    ) {
                      setFirstName(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="col-lg-6">
                <InputForm
                  icon={`fa-user`}
                  name="last_name"
                  isLabel={true}
                  placeholder="Last Name"
                  label="Last Name"
                  value={lastName}
                  isFeildArry={true}
                  required
                  onChange={(e) => {
                    if (
                      ALPHA_REGEX.test(e.target.value) ||
                      e.target.value == ""
                    ) {
                      setLastName(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="col-lg-12 mt-3">
                <InputForm
                  icon={`fa-phone`}
                  name="phone"
                  isLabel={true}
                  placeholder="Phone Number"
                  label="Phone Number"
                  value={phone}
                  isFeildArry={true}
                  required
                  onChange={(e) => {
                    const trimmedValue = e.target.value
                      .replace(/\D/g, "")
                      .substring(0, 11);
                    setPhone(trimmedValue);
                  }}
                />
              </div>
              <div className="col-lg-12 mt-3">
                <InputForm
                  icon={`fa-envelope`}
                  name="email"
                  type="email"
                  isLabel={true}
                  placeholder="E-mail"
                  required
                  value={email}
                  isFeildArry={true}
                  onChange={(e) => setEmail(e.target.value)}
                  label="E-mail"
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  icon={`fa-lock`}
                  name="password"
                  type="password"
                  isLabel={true}
                  placeholder="Password"
                  isPassword={true}
                  required
                  label="Password"
                  value={password}
                  isFeildArry={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  icon={`fa-lock`}
                  name="confirm_password"
                  type="password"
                  isPassword={true}
                  isLabel={true}
                  required
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  value={confirmPassword}
                  isFeildArry={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-lg-6 mt-3">
                <SelectForm
                  icon={`fa-people`}
                  options={["Male", "Female", "Other"]}
                  name="gender"
                  isLabel={true}
                  placeholder="Gender"
                  label="Gender"
                  isFeildArry={true}
                  value={gender}
                  setFieldValue={setGender}
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-lg-6 mt-3">
                <SelectForm
                  icon={`fa-city`}
                  name="address"
                  options={["Karachi", "Islamabad"]}
                  isLabel={true}
                  placeholder="City"
                  label="City"
                  isFeildArry={true}
                  value={city}
                  setFieldValue={setCity}
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>

              <div className="mt-2 d-flex align-items-center justify-content-end mt-2 ">
                <Button
                  variant="contained"
                  className="mt-2 custom_button_lg fw-bold d-flex gap-2 px-5 align-items-center"
                  size="small"
                  type="submit"
                  color="primary"
                  sx={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 col-12 d-lg-flex d-none">
          <img src="assets/images/banner.png" className="img-fluid" alt="" />
        </div>
      </div>
     
      <Snackbar open={open}>
        <SnackbarContent
          sx={{
            backgroundColor: `${
              toastMsg.includes("Valid") || toastMsg.includes("Error")
                ? "#EF2B42"
                : "rgb(9, 80, 130)"
            }`,
            height: "50px",
          }}
          message={
            <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {" "}
              <i className="fa fa-info-circle"></i> <span>{toastMsg}</span>
            </p>
          }
        />
        {/* <Alert severity="info">This is a success Alert.</Alert> */}
      </Snackbar>
    </div>
  );
};

export default CustomerRegister;
