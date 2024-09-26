import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CategotyListAction } from "../../redux/slice/CategorySlice";
import {
  createPostAction,
  resetMedicine,
} from "../../redux/slice/medicineSlice";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

import IconButton from "@mui/material/IconButton";
// import CloseIcon from '@mui/icons-material/Close';

import { diseaseTypes } from "../../static/Constants";

const VendorMedicine = () => {
  const [medicinename, setMedicineName] = useState("");
  const [image, setImage] = useState("");
  const [medicineDescription, setMedicineDescription] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const [medicineStock, setMedicineStock] = useState("");
  const [medicineCategory, setMedicineCategory] = useState("");
  const [diseaseType, setDiseaseType] = useState("");

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  function resetForm() {
    setMedicineName("");
    setImage("");
    setMedicineDescription("");
    setMedicinePrice("");
    setMedicineCategory("");
    setMedicineStock("");
  }

  useEffect(() => {
    dispatch(CategotyListAction());
  }, [dispatch]);

  const data = useSelector((state) => state?.category);
  const vendorCity = useSelector(
    (state) => state?.auth.LoginData.business_city
  );
  const vendorID = useSelector((state) => state?.auth.LoginData._id);

  console.log(data);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const { loading, appErr, serverErr, medicine, isCreated } = useSelector(
    (state) => state.medicine
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("medicineStock", medicineStock);
    dispatch(
      createPostAction({
        medicinename: medicinename,
        image: image,
        description: medicineDescription,
        price: medicinePrice,
        category: medicineCategory,
        diseaseType: diseaseType,
        stock: medicineStock,
        vendorCity: vendorCity,
        vendorID: vendorID,
      })
    ).then(() => {
      setOpen(true);
      resetForm();
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-3 ">
            <Sidebar />
          </div>
          <div className="col-lg-9 h-100">
            <div className="p-3 bg-white g_border_radius  ">
              <div>
                <h5 className="fw-bold d-flex gap-2 align-items-center mb-0">
                  <i class="fa-solid fa-hospital"></i>
                  Vendor Medicine
                </h5>
              </div>
            </div>

            <div className="row mt-3 bg-white g_border_radius ">
              <Form className="py-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Medicine Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Medicine Name"
                    value={medicinename}
                    onChange={(e) => setMedicineName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Medicine Image</Form.Label>
                  <Form.Control type="file" onChange={handleImage} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Medicine Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Medicine Description"
                    value={medicineDescription}
                    onChange={(e) => setMedicineDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Medicine Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Medicine Price"
                    value={medicinePrice}
                    onChange={(e) => setMedicinePrice(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Disease Type</Form.Label>
                  <Form.Select
                    value={diseaseType}
                    onChange={(e) => setDiseaseType(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a disease type
                    </option>
                    {data &&
                      diseaseTypes?.map((elm, index) => (
                        <option value={elm} key={index}>
                          {elm}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Medicine Category</Form.Label>
                  <Form.Select
                    value={medicineCategory}
                    onChange={(e) => setMedicineCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {data &&
                      data?.categoryList?.map((elm) => (
                        <option value={elm?.title} key={elm?.id}>
                          {elm?.title}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Medicine Stock"
                    value={medicineStock}
                    onChange={(e) => setMedicineStock(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {loading ? "Loading..." : "Submit"}
                  {/* Submit */}
                </Button>
              </Form>
            </div>
          </div>
        </div>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Category Deleted Successfully!"
        >
          <SnackbarContent
            sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
            message={
              <p>
                {" "}
                <i className="fa fa-info-circle"></i> Medicine added
                Successfully!
              </p>
            }
          />
        </Snackbar>
      </div>
    </>
  );
};

export default VendorMedicine;
