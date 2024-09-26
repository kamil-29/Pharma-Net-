import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CheckoutForm from "../../components/CheckOutForm";
import { useEffect, useState } from "react";

//importing key from env
const stripePromise = loadStripe("pk_test_51PMZjZLuvwuwI7sV1KHeiZYC777Hm6RD6o3BuGJbaI1jrQ7A107exIZhsc0bPgqB5GTpwM36voF8IVd3cFT9LeLG00yR0nV9Es");

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentOrderData, setOrderData] = useState({});

  const { clientSecret, orderData } = location.state || {};

  console.log(clientSecret);
  console.log(orderData);

  useEffect(() => {
    if (!clientSecret || !orderData) {
      navigate("/");
    } else {
      setOrderData(orderData);
    }
  }, [clientSecret, orderData]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-primary shadow-lg mb-5 rounded">
            <div className="card-header bg-primary text-white text-center">
              <h5 className="card-title mb-0">Payment</h5>
            </div>
            <div className="card-body">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                }}
              >
                <CheckoutForm orderData={currentOrderData} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
