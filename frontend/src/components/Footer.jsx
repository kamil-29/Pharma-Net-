import React from "react";
import Logo from "./Logo";
import { HeaderData } from "../static/HeaderData";
import { Link } from "react-router-dom";
import { SocialData } from "../static/SocialData";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <>
      <section className="footer text-lg-start text-center ">
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-6 d-flex justify-content-lg-start  justify-contet-center gap-2 align-items-center align-items-lg-start flex-column col-12">
              {/* <Logo /> */}
              {/* <p className="fs-8 col-lg-8 text-faded ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium libero iusto omnis, assumenda, fugiat nesciunt minus
                beatae porro architecto numquam facere dolorum, mollitia soluta
                iure quidem magnam optio aperiam. Blanditiis!
              </p> */}
              <div className="w-100 mb-3">
                <h3>Sign up for Newsletter</h3>
                <input
                  type="text"
                  className="input_global w-50"
                  placeholder="Email Adress "
                />
              </div>
              <div>
                <h6 className="fw-bold">Follow Us</h6>
                <div className="mt-3 d-flex gap-3">
                  {SocialData?.map(({ socIcon, socLink }, i) => {
                    return (
                      <Link className="icon_box" to={socLink} key={i}>
                        <i className={`fa-brands ${socIcon} `}></i>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 mt-lg-3 d-lg-flex flex-column d-none">
              <h6 className="fw-bold">Important Links</h6>
              <p
                className="fs-8 mt-2"
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
                <a href="#">About</a>
                <a href="#">FAQs</a>
              </p>
            </div>
            <div className="col-lg-3 col-12 mt-lg-3 mt-4">
              <h6 className="fw-bold">For More Detail</h6>
              <p className="fs-8 mt-3">info@pharma-net.com</p>
              <p className="fs-8 mt-0">0347-008234689</p>
            </div>
          </div>
          <div className="line light mt-4"></div>
          <p className="fs-7 text-light mt-3 text-center text-faded">
            Copyright © 2023 PHARMA-NET All Rights Reserved. | Terms of Services
            | Privacy & Policy
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
