import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../redux/slice/customerSlice";
import axios from "axios";

const CheckoutForm = ({ orderData }) => {
  const { address, postal } = orderData;
  console.log("Recived", address, postal);
  const cartData = useSelector((state) => state.customer.cart);

  const user = useSelector((state) => state.auth.LoginData);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [open, setOpen] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    console.log("this is the order data", orderData);

    const { paymentIntent, error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: window.location.origin }, redirect: "if_required" });

    if (error) {
      console.log(error);
      setIsProcessing(false);
      return setToastMsg(error.message || "An error occurred");
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const response = await axios.post("http://localhost:3000/order", {
          address,
          postal: postal,
          total: cartData.total,
          customerID: user._id,
          items: [...cartData.items],
        });
        console.log(response);
        setToastMsg("Order placed succesfully");
        dispatch(resetCart());
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 5000);
        if (response.error) {
          console.log(response.error);
          setIsProcessing(false);
          return setToastMsg(response.error.message || "An error occurred");
        }
        navigate("/");
        return; // Return the data received from the server if needed
      } catch (error) {
        setToastMsg(error.response?.data?.message || "An error occurred");
        console.error(":", error);
        throw error; // Throw the error for handling in the calling component
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing} className="btn mt-3 btn-primary">
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
