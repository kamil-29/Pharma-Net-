import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InputForm from "@components/formElements/InputForm";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { resetCart } from "../../redux/slice/customerSlice";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import CustomerOrderItem from "../../components/CustomerOrderItem";

const Orders = () => {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const cartData = useSelector((state) => state.customer.cart);
  const user = useSelector((state) => state.auth.LoginData);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    getOrders();
  }, [dispatch]);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/orders/customer/${String(user._id)}`
      );
      console.log(response.data.data);
      setOrdersList(response.data.data);
      //   console.log("Orders LIST:", response.data);
      return; // Return the data received from the server if needed
    } catch (error) {
      //   console.error("Error fetching order:", error);
      throw error; // Throw the error for handling in the calling component
    }
  };

  return (
    <div>
      <Header />
      <main className="checkout" style={{ minHeight: "400px" }}>
        <div
          style={{
            border: "1px solid rgba(128, 128, 128, 0.3)",
            width: "100%",
            padding: "25px",
            borderRadius: "6px",
          }}
        >
          <h3 className="mb-4">Orders:</h3>

          {ordersList.length > 0 &&
            ordersList?.map((item) => <CustomerOrderItem item={item} />)}
        </div>
      </main>
      <Footer />
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

export default Orders;
