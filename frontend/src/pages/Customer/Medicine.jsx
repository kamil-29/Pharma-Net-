import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { addToCart } from "../../redux/slice/customerSlice";
import axios from "axios";
import MedicineCard from "../../components/MedicineCArd";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
const Medicine = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);
  const [recommends, setRecommends] = useState([]);

  const medicine = useSelector((state) => state.customer.selectedMedicine);
  const auth = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (amount <= 0) {
      setToastMsg("Select valid amount!");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
      return;
    }
    dispatch(addToCart({ amount, medicine }));
    setAmount(0);
    setToastMsg("Medicine Added to Cart!");
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/medicines/${medicine.diseaseType}/${medicine.category}`
      );
      console.log("Order placed successfully:", response.data);
      setRecommends(response.data);
      return; // Return the data received from the server if needed
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw error; // Throw the error for handling in the calling component
    }
  };
  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div>
      <Header />
      <div className="CustomerMedicine">
        <img className="medicineimg" src={medicine.image} alt="" />
        <div className="relative">
          <span className="medicine_category">{medicine?.category}</span>
          <h1>{medicine.medicinename}</h1>
          <p>{medicine.description}</p>
          <p>
            Disease Type :{" "}
            <span className="text-bold">{medicine?.diseaseType}</span>{" "}
          </p>
          <p>
            Vendor City :{" "}
            <span style={{ color: "royalblue" }}>{medicine?.vendorCity}</span>
          </p>
          <p>
            Vendor Name :{" "}
            <span className="text-semibold">{medicine?.vendorName}</span>
          </p>
          <p>
            Price : <span className="text-bold">{medicine?.price} rs</span>
          </p>
          {medicine?.stock > 0 ? (
            <div>
              <p style={{ fontSize: "0.815rem", fontWeight: "500" }}>
                Stock Remaining :{" "}
                <span style={{ color: "royalblue" }}> {medicine?.stock}</span>
              </p>
              {auth.LoginData && auth.LoginData.user_type !== "vendor" ? (
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{ fontSize: "0.825rem", fontWeight: "500" }}
                      htmlFor=""
                    >
                      Amount:
                    </label>
                    <input
                      style={{
                        width: "100px",
                        marginRight: "2rem",
                        padding: "0 8px",
                      }}
                      type="number"
                      value={amount}
                      max="20"
                      onChange={(e) => {
                        // Check if the entered value is greater than 20
                        if (e.target.value > Number(medicine?.stock)) {
                          // If greater than 20, set the value to 20
                          setAmount(medicine?.stock);
                        } else {
                          // Otherwise, update the value
                          setAmount(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    style={{ backgroundColor: "orange" }}
                    variant="contained"
                  >
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <span
                  style={{
                    color: "grey",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                  }}
                >
                  Please login as customer to purchase this medicine
                </span>
              )}
            </div>
          ) : (
            <span
              style={{
                color: "grey",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}
            >
              Medicine out of stock!
            </span>
          )}
        </div>
      </div>
      {recommends.length > 1 ? (
        <div>
          <h4 style={{ width: "80%", margin: "0.5rem auto 2rem" }}>
            Recommended Medicines
          </h4>
          <div className="recommendedMeds">
            {recommends.map((item) => {
              if (item._id === medicine._id) return;
              return <MedicineCard elm={item} />;
            })}
          </div>
        </div>
      ) : null}

      <Snackbar open={open}>
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
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

export default Medicine;
