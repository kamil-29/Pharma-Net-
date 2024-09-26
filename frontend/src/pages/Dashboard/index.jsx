import React, { useEffect, useState } from "react";
import ScoreCard from "../../components/ScoreCard";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [card, setCard] = useState([
    {
      value: "confirmed",
      name: "Confirmed",
      number: 0,
    },
    {
      value: "medicines",
      name: "Medicines",
      number: 0,
    },
    {
      value: "ready_for_delivery",
      name: "Ready for delivery",
      number: 0,
    },
    {
      value: "item_on_the_way",
      name: "Item on the way",
      number: 0,
    },
    {
      value: "delivered",
      name: "Delivered",
      number: 0,
    },
    {
      value: "refunded",
      name: "Refunded",
      number: 0,
    },
    {
      value: "scheduled",
      name: "Scheduled",
      number: 0,
    },
    {
      value: "all",
      name: "All",
      number: 0,
    },
  ]);
  const [medicineCount, setMedicineCount] = useState(0);

  const data = useSelector((state) => state?.auth?.LoginData);
  if (data === undefined || data?.vendor_name === undefined) {
    navigate("/login");
  }

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    }
  }, []);

  const user = useSelector((state) => state.auth.LoginData);
  console.log("This is the user ", user);
  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/orders/${String(user._id)}`);
      const totalOrders = Object.values(response.data.countsByStatus).reduce((acc, curr) => acc + curr, 0);
      const updatedCard = card.map((cardItem) => {
        if (cardItem.value === "all") {
          return {
            ...cardItem,
            number: totalOrders,
          };
        } else if (cardItem.value === "medicines") {
          return {
            ...cardItem,
            number: medicineCount,
          };
        } else {
          return {
            ...cardItem,
            number: response.data.countsByStatus[cardItem.value] || 0,
          };
        }
      });

      setCard(updatedCard);
      //   console.log("Orders LIST:", response.data);
      return; // Return the data received from the server if needed
    } catch (error) {
      //   console.error("Error fetching order:", error);
      throw error; // Throw the error for handling in the calling component
    }
  };

  const fetchMedicineData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/medicine/${user._id}`);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      setMedicineCount(data.length);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching medicine data:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    fetchMedicineData();
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container ">
        <div className="row mt-3">
          <div className="col-lg-3 ">
            <Sidebar />
          </div>
          <div className="col-lg-9 h-100">
            <div className="p-3 bg-white g_border_radius  ">
              <div>
                <h5 className="fw-bold d-flex gap-2 align-items-center mb-0">
                  <i className="fa-solid fa-chart-simple"></i> Dashboard order statistics
                </h5>
              </div>
            </div>
            <div className="row mt-3">
              {card.map(({ name, number }, index) => (
                <div key={index} className="col-lg-3 mb-3 col-6">
                  <ScoreCard name={name} number={number} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
