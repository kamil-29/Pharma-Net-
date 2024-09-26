import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  CreateCategotyAction,
  resetCategory,
} from "../../redux/slice/CategorySlice";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

import IconButton from "@mui/material/IconButton";

const CategoryComponent = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { loading, isCreated } = useSelector((state) => state.category);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      CreateCategotyAction({
        title: title,
      })
    )
      .then((data) => {
        console.log("success", data);
        if (data.error) {
          setToastMessage("Category already exists!");
        } else {
          setToastMessage("Category added successfully!");
        }
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 5000);
      })
      .catch((err) => {
        console.log("my errrr", err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
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
                  Category
                </h5>
              </div>
            </div>

            {/*  */}
            <div className="row mt-3 bg-white g_border_radius ">
              <Form className="py-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  {loading ? "Processing..." : "Submit"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Category Created Successfully!"
      >
        <SnackbarContent
          sx={{
            backgroundColor: `${
              toastMessage !== "Category already exists!"
                ? "rgb(9, 80, 130)"
                : "#EF4444"
            }`,
            height: "50px",
          }}
          message={
            <p>
              <i className="fa fa-info-circle"></i> {toastMessage}
            </p>
          }
        />
      </Snackbar>
    </>
  );
};

export default CategoryComponent;
