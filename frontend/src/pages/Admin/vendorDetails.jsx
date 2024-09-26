import { Snackbar, SnackbarContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const VendorDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendorsData, setVendorData] = useState([]);

  useEffect(() => {
    const GetVendorDeatils = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/vendors/${id}`);
        console.log(res);
        if (res.data) {
          setVendorData(res.data);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    GetVendorDeatils();
  }, []);
  console.log(vendorsData);

  return (
    <>
      {loading ? (
        <div className="loader-bg wrapper_inner  min-100 "></div>
      ) : (
        <>
          <Header />
          <div className="container">
            <div className="row mt-3">
              <div className="col-lg-3">
                <Sidebar />
              </div>
              <div className="col-lg-9 h-100">
                <div className="p-3 bg-white g_border_radius">
                  <div>
                    <h5 className="fw-bold d-flex gap-2 align-items-center mb-0">
                      <i className="fa-solid fa-hospital"></i>
                      All Vendors Data
                    </h5>
                  </div>
                </div>

                <div className="card mt-3" style={{ width: "25rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Vendor Details</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">First Name: {vendorsData?.first_name}</li>
                    <li className="list-group-item">Last Name: {vendorsData?.last_name}</li>
                    <li className="list-group-item">Vendor Name: {vendorsData?.vendor_name}</li>
                    <li className="list-group-item">Business Email: {vendorsData?.business_email}</li>
                    <li className="list-group-item">Business Phone: {vendorsData?.business_phone}</li>
                  </ul>
                  <div className="card-body">
                    <a href={vendorsData?.website} className="card-link">
                      Website
                    </a>
                  </div>
                </div>
                <div className="card mt-3 ms-2" style={{ width: "25rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Vendor Details</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Con person gender: {vendorsData?.contact_person_gender}</li>
                    <li className="list-group-item">Con person address: {vendorsData?.contact_person_address}</li>
                    <li className="list-group-item">Business type: {vendorsData?.business_type}</li>
                    <li className="list-group-item">Business Reg No: {vendorsData?.business_registration_number}</li>
                    <li className="list-group-item">Tax idef no: {vendorsData?.tax_identification_number}</li>
                    <li className="list-group-item">Business City: {vendorsData?.business_city}</li>
                  </ul>
                  <div className="card-body">
                    <a href={vendorsData?.website} className="card-link">
                      Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Snackbar open={open} autoHideDuration={6000} message="Category Created Successfully!">
            <SnackbarContent
              sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
              message={
                <p>
                  <i className="fa fa-info-circle"></i> Category deleted Successfully!
                </p>
              }
            />
          </Snackbar>
        </>
      )}
    </>
  );
};

export default VendorDetails;
