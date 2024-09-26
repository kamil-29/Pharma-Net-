import { CircularProgress } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import Dashboard from "../pages/Dashboard";
import Customer from "../pages/Customer";
import Vendor from "../pages/Vendor";
import LoginForm from "../pages/Login";
import VendorMedicine from "../pages/Vendor/VendorMedicine";
import Medicine from "../pages/Vendor/Medicines";
import Category from "../pages/Vendor/Category";
import CategoryList from "../pages/Vendor/CategoryList";
import Orders from "../pages/Vendor/Orders";
import FeedBack from "../pages/Vendor/FeedBack";
import CustomerMedicine from "../pages/Customer/Medicine";
import CustomerOrders from "../pages/Customer/Orders";

import Checkout from "../pages/Customer/Checkout";
import Payment from "../pages/Customer/paymentForm";
import AllUsers from "../pages/Admin/allUsers";
import AllVendors from "../pages/Admin/allVendors";
import VendorDetails from "../pages/Admin/vendorDetails";
const Home = lazy(() => import("../pages/Home"));
const VendorRegister = lazy(() => import("../pages/VendorRegister"));
const CustomerRegister = lazy(() => import("../pages/CustomerRegister"));

const RouterWrapper = () => {
  const auth = localStorage.getItem("token");

  return (
    <>
      <Suspense
        fallback={
          <div className="loader-bg wrapper_inner  min-100 ">
            <CircularProgress color="primary" />
          </div>
        }
      >
        <Router>
          <Routes>
            <Route path="/" element={<CommonLayout />}>
              <Route index element={<Home />} />
              <Route path="customer-register" element={<CustomerRegister />} />
              <Route path="vendor-register" element={<VendorRegister />} />
              <Route path="login" element={<LoginForm />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendor />} />
            <Route path="/vendors/medicine" element={<VendorMedicine />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/category" element={<Category />} />
            <Route path="/categorylist" element={<CategoryList />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customerOrders" element={<CustomerOrders />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="/customer/medicine" element={<CustomerMedicine />} />
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/payment" element={<Payment />} />

            {/* ADMIN ROUTES */}
            <Route path="/allCustomers" element={<AllUsers />} />
            <Route path="/allVendors" element={<AllVendors />} />
            <Route path="/vendor/details/:id" element={<VendorDetails />}></Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};

export default RouterWrapper;
