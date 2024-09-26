import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { baseURL } from "../../static/Api"
import VendorTable from "../../components/tabels/VendorTable";
import { useNavigate } from "react-router-dom";

const Vendor = () => {

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getVendorsData() {
    const request = await fetch(baseURL + "/vendors");
    const response = await request.json();
    setVendors(() => response.data);
    setLoading(false);
    console.log(vendors)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem("token")
    if (!auth) {
      navigate('/login')
    }
    try {
      getVendorsData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

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
                  <i className="fa-solid fa-chart-simple"></i>
                  All Vendors
                </h5>
              </div>
            </div>
            <div className="row mt-3">

              {loading ? <p>Loading</p> : <VendorTable vendors={vendors} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendor;
