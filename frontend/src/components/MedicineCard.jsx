import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedMedicine } from "../redux/slice/customerSlice";
const MedicineCard = ({ elm }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();

  const handleMedicineClick = () => {
    // Navigate to /customer/medicine route
    navigate("/customer/medicine");
    dispatch(setSelectedMedicine(elm));
  };
  return (
    <div className="card position-relative">
      {/* <p>{elm.medicinename}</p> */}
      <div key={elm?._id}>
        <span className="category_name">{elm?.category}</span>
        <img
          src={elm?.image}
          className="card-img-bottom mt-0 rounded-3"
          alt={elm?.medicinename}
        />
        <div className="card-body mb-0">
          <h5
            style={{ fontSize: "1rem", textAlign: "left", cursor: "pointer" }}
            onClick={handleMedicineClick}
          >
            {elm?.medicinename}
          </h5>
          <span>Rs {elm?.price}</span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
              gap: "0.5rem",
            }}
          >
            <span
              style={{ fontSize: "0.68rem", fontWeight: "500", color: "gray" }}
            >
              {elm?.vendorName}
            </span>
            <span
              style={{ fontSize: "0.68rem", fontWeight: "500", color: "gray" }}
            >
              {elm?.vendorCity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
