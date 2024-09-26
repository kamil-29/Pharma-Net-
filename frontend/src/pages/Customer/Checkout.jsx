import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import InputForm from "@components/formElements/InputForm";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { resetCart } from "../../redux/slice/customerSlice";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [cashOnDeliver, setCashOnDeliver] = useState(false);
  console.log(cashOnDeliver);
  const cartData = useSelector((state) => state.customer.cart);
  const user = useSelector((state) => state.auth.LoginData);

  const [orderData, setOrderData] = useState({});
  const s = useSelector((state) => state.customer.cart);

  const handlePlaceOrderCOD = async () => {
    if (address === "" || postalCode === "") {
      setToastMsg("Address & Postal inputs required");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);

      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/order", {
        address,
        postal: postalCode,
        total: cartData.total,
        customerID: user._id,
        items: [...cartData.items],
      });
      console.log("Order placed successfully:", response.data);
      dispatch(resetCart());
      setToastMsg("Order placed succesfully");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
      return; // Return the data received from the server if needed
    } catch (error) {
      console.error("Error placing order:", error);
      throw error; // Throw the error for handling in the calling component
    }
  };
  const navigate = useNavigate();

  console.log("This is payment intent ID", paymentIntentId);
  const handlePlaceOrderOnlinePay = async () => {
    if (address === "" || postalCode === "") {
      setToastMsg("Address & Postal inputs required");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);

      return;
    }
    try {
      let data;
      console.log("Creating new payment intent");
      const response = await axios.post(
        `http://localhost:3000/paymentIntent`,
        {
          amount: cartData.total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      data = response.data;

      console.log("Payment intent data:", data);
      const newOrderData = {
        address: address,
        postal: postalCode,
        total: cartData.total,
        customerID: user._id,
        items: [...cartData.items],
      };

      navigate("/customer/payment", {
        state: { clientSecret: data.clientSecret, orderData: newOrderData },
      });
    } catch (e) {
      console.log("coame here");
      console.log(e);
      setToastMsg("Error occurred");
    }
  };

  return (
    <div>
      <Header />
      <main className="checkout">
        <div className="checkout-left">
          <form className="checoutForm" action="#">
            <div className="row">
              <h4>Shipping Address :</h4>
              <div className="col-12" style={{ marginBottom: "0.8rem" }}>
                <InputForm icon={`fa-home`} name="address" isLabel={true} placeholder="Enter Your Address" value={address} label="Address" onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="col-12">
                <InputForm icon={`fa-home`} name="postal" isLabel={true} placeholder="Enter Your Postal Code" value={postalCode} label="Postal Code" onChange={(e) => setPostalCode(e.target.value)} />
              </div>
            </div>
          </form>
          <h4>Items ({cartData.items.length}) :</h4>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                No.
              </p>
              <p
                style={{
                  margin: "0",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Name
              </p>
              <p
                style={{
                  margin: "0",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Amount
              </p>
              <p
                style={{
                  margin: "0",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Price/Item
              </p>
            </div>
            {cartData.items.length > 0
              ? cartData.items.map((item, index) => (
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
                    <p style={{ margin: "0" }}>{index + 1} #</p>
                    <p style={{ margin: "0" }}>{item.medicine.medicinename}</p>
                    <p style={{ margin: "0" }}>{item.amount}</p>
                    <p style={{ margin: "0" }}>{item.medicine.price}</p>
                  </div>
                ))
              : "No items"}
          </div>
        </div>
        <aside className="checkout-right">
          <h4>Total : {cartData.total}</h4>
          <h6>Discount : 0</h6>
          <h6>Tax : 0</h6>
          <h6>
            <input type="checkbox" onChange={(e) => setCashOnDeliver(e.target.checked)} className="custom-control-input" id="customSwitch1" /> Cash on delivery
          </h6>
          {cartData.items.length > 0 ? (
            <>
              <div className="d-flex align-items-center">
                <Button onClick={cashOnDeliver ? handlePlaceOrderCOD : handlePlaceOrderOnlinePay} style={{ backgroundColor: "orange" }} variant="contained">
                  Place Order
                </Button>
              </div>
            </>
          ) : null}
        </aside>
      </main>
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

export default Checkout;
