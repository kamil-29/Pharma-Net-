import React from "react";
import BreadcrumbsComponent from "./Breadcrumbs";
import { Button, CircularProgress } from "@mui/material";

const CommonBox = ({
  children,
  title,
  isButtonShow = true,
  buttonText = title,
  onClick = {},
  icon,
  loading = false,
  header = true,
}) => {
  return (
    <>
      <div
        className={`au-box min_box_100  mt-3 ${
          loading == true &&
          "d-flex justify-content-center align-items-center  "
        } `}
      >
        {loading == true ? (
          <CircularProgress color="primary" />
        ) : (
          <>
            {header && (
              <div className="d-flex justify-content-between align-items-center">
                <div className="fs-4 fw-bold text-capitalize">
                  {" "}
                  <i className={`me-2 fa-solid ${icon}`}></i> {title}
                </div>
                {isButtonShow && (
                  <Button
                    variant="contained"
                    className="custom_button d-flex gap-2  align-items-center"
                    size="small"
                    onClick={onClick}
                    color="primary"
                  >
                    <i className="fa-solid fa-plus"></i>
                    {buttonText}
                  </Button>
                )}
              </div>
            )}
            {children}
          </>
        )}
      </div>
    </>
  );
};

export default CommonBox;
