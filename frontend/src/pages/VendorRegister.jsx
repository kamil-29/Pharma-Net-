import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import InputForm from "@components/formElements/InputForm";
import SelectForm from "../components/formElements/SelectForm";
import OurBlog from "@components/OurBlogs";
import { baseURL } from "../static/Api";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

const VendorRegister = () => {
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [vendorName, setVendorName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessRegNo, setBusinessRegNo] = useState("");
  const [businessTIN, setBusinessTIN] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddr, setBusinessAddr] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessWeb, setBusinessWeb] = useState("");

  const formRef = useRef();

  const formData = {};

  async function handleSubmit(e) {
    e.preventDefault();
    formData["first_name"] = firstName;
    formData["last_name"] = lastName;
    formData["vendor_name"] = vendorName;
    formData["contact_person_phone"] = phone;
    formData["password"] = password;
    formData["confirm_password"] = confirmPassword;
    formData["contact_person_gender"] = gender;
    formData["contact_person_email"] = email;

    formData["contact_person_address"] = businessCity;
    formData["business_type"] = businessType;
    formData["business_registration_number"] = businessRegNo;
    formData["tax_identification_number"] = businessTIN;
    formData["business_email"] = businessEmail;
    formData["business_phone"] = businessPhone;
    formData["business_address"] = businessAddr;
    formData["business_city"] = businessCity;
    formData["website"] = businessWeb;

    const data = JSON.stringify(formData);
    console.log("venddata:", data);
    const request = await fetch(baseURL + "/vendors", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();
    console.log("ven res", response);
    if (response.message.includes("Vendor not created") || response.error) {
      setOpen(true);
      let errMsg =
        response.error.length > 20 ? "Operation Unsuccesfull!" : response.error;
      setToastMsg("Error! " + errMsg);
      formRef.current.reset();
      setTimeout(() => {
        setOpen(false);
      }, 4000);
      return;
    }
    setOpen(true);
    setToastMsg("Vendor Registered Succesfully!");
    formRef.current.reset();
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  }

  const ALPHA_REGEX = /^[A-Za-z]+$/;

  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    formData[e.target.name] = e.target.value;
  }

  return (
    <div className="container mt-5">
      <div className="row mx-0 mb-3  align-items-center">
        <div className="col-lg-8   mt-3">
          <div className="mb-2 d-flex justify-content-start align-items-start flex-column">
            <h2 className="text-center mt-2  fw-bold">
              Vendor <span className="text-blue"> Registration</span>
            </h2>
            <p className="text-faded fs-7">
              Become part of our platform and unlock opportunities to expand
              your business, increase visibility, and connect with potential
              clients. Our user-friendly registration process ensures a seamless
              experience, enabling you to start showcasing your offerings in no
              time.
            </p>
          </div>
          <h6 className="mb-3 fw-bold fs-4">
            <span className="text-blue"> Business </span> Information
          </h6>
          <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-lg-6">
                <InputForm
                  icon={`fa-user`}
                  name="vendor_name"
                  isLabel={true}
                  placeholder="Vendor Name"
                  label="Vendor Name"
                  value={vendorName}
                  isFeildArry={true}
                  onChange={(e) => {
                    setVendorName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-6">
                <InputForm
                  name="business_type"
                  isLabel={true}
                  placeholder="Business Type"
                  label="Business Type"
                  value={businessType}
                  isFeildArry={true}
                  onChange={(e) => {
                    setBusinessType(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  name="business_registration_number"
                  isLabel={true}
                  placeholder="Business Registration Number"
                  label="Business Registration Number"
                  value={businessRegNo}
                  isFeildArry={true}
                  onChange={(e) => {
                    const trimmedValue = e.target.value
                      .replace(/\D/g, "")
                      .substring(0, 16);
                    e.target.value = trimmedValue;
                    setBusinessRegNo(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  name="tax_identification_number"
                  isLabel={true}
                  placeholder="Tax Identification Number (TIN) or EIN"
                  label="Tax Identification Number (TIN) or EIN"
                  value={businessTIN}
                  isFeildArry={true}
                  onChange={(e) => {
                    const trimmedValue = e.target.value.substring(0, 24);
                    e.target.value = trimmedValue;
                    setBusinessTIN(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  name="business_phone"
                  isLabel={true}
                  placeholder="Phone Number"
                  label="Phone Number"
                  value={businessPhone}
                  isFeildArry={true}
                  onChange={(e) => {
                    const trimmedValue = e.target.value
                      .replace(/\D/g, "")
                      .substring(0, 11);
                    e.target.value = trimmedValue;
                    setBusinessPhone(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <SelectForm
                  icon={`fa-city`}
                  name="business_city"
                  options={["Karachi", "Islamabad"]}
                  isLabel={true}
                  placeholder="Business City"
                  label="Business City"
                  isFeildArry={true}
                  value={businessCity}
                  setFieldValue={setBusinessCity}
                  required
                  onChange={(e) => {
                    setBusinessCity(e.target.value);
                  }}
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  name="business_address"
                  isLabel={true}
                  placeholder="Business Address"
                  label="Business Address"
                  value={businessAddr}
                  isFeildArry={true}
                  onChange={(e) => {
                    setBusinessAddr(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  name="business_email"
                  isLabel={true}
                  placeholder="Email Address"
                  label="Email Address"
                  value={businessEmail}
                  isFeildArry={true}
                  onChange={(e) => {
                    setBusinessEmail(e.target.value);
                  }}
                  type="email"
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  name="website"
                  isLabel={true}
                  placeholder="Web Site"
                  label="Web Site"
                  value={businessWeb}
                  isFeildArry={true}
                  onChange={(e) => {
                    setBusinessWeb(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <h6 className="mb-3 fw-bold fs-4 mt-3">
              <span className="text-blue"> Contact </span> Person
            </h6>

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
                  name="contact_person_phone"
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
                  name="contact_person_email"
                  isLabel={true}
                  placeholder="E-mail"
                  label="E-mail"
                  type="email"
                  value={email}
                  isFeildArry={true}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  label="Password"
                  value={password}
                  isFeildArry={true}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <InputForm
                  icon={`fa-lock`}
                  name="lastname"
                  type="confirm_password"
                  isPassword={true}
                  isLabel={true}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  value={confirmPassword}
                  isFeildArry={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-6 mt-3">
                <SelectForm
                  icon={`fa-people`}
                  options={["Male", "Female", "Other"]}
                  name="contact_person_gender"
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
                <InputForm
                  icon={`fa-city`}
                  name="contact_person_address"
                  isLabel={true}
                  placeholder="Address"
                  label="Address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-2 d-flex align-items-center justify-content-end mt-2 ">
                <Button
                  variant="contained"
                  className="mt-2 custom_button_lg  fw-bold d-flex gap-2 px-5 align-items-center"
                  size="small"
                  type="submit"
                  color="primary"
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

export default VendorRegister;
