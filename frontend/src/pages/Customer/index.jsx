import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { baseURL } from "../../static/Api";
import CustomerTable from "../../components/tabels/CustomerTable";
import { useNavigate } from "react-router-dom";


const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCustomersData() {
    const request = await fetch(baseURL + "/users");
    const response = await request.json();
    setCustomers(() => response.data);
    setLoading(false);
  }

  const navigate = useNavigate()
  
  useEffect(() => {
    const auth = localStorage.getItem("token")
    if (!auth) {
      navigate('/login')
    }

    try {
      getCustomersData();
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
                  All Customers
                </h5>
              </div>
            </div>
            <div className="row mt-3">
              {loading ? <p>Loading</p> : <CustomerTable customers={customers} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
