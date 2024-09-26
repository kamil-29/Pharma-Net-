import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  CategotyListAction,
  deletecategoryDetails,
} from "../../redux/slice/CategorySlice";

import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

const CategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(CategotyListAction());
  }, [dispatch]);

  const data = useSelector((state) => state?.category);

  console.log(data);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deletecategoryDetails(id))
      .then(() => {
        console.log("Category Deleted");
        // After successful deletion, fetch the updated category list
        dispatch(CategotyListAction());
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 6000);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        // Handle error if needed
      });
    console.log("Category Deleted");
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
                  Category List
                </h5>
              </div>
            </div>

            <div>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {data?.categoryList?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No results found.
                        </td>
                      </tr>
                    ) : (
                      <>
                        {data &&
                          data?.categoryList?.map((elm) => (
                            <tr key={elm?.id} style={{ textAlign: "center" }}>
                              <td>{elm?.id?.slice(0, 5)}</td>
                              <td>{elm?.title}</td>
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "15px",
                                  justifyContent: "center",
                                }}
                              >
                                <i
                                  className="fa-solid fa-trash-can"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(elm?._id)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                  </>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Category Created Successfully!"
      >
        <SnackbarContent
          sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
          message={
            <p>
              <i className="fa fa-info-circle"></i> Category deleted
              Successfully!
            </p>
          }
        />
      </Snackbar>
    </>
  );
};

export default CategoryList;
