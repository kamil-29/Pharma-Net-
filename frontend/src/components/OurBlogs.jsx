import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import '@splidejs/splide/dist/css/themes/splide-default.css';
// import Splide from "@splidejs/splide";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
const OurBlog = () => {
  const splideOptions = {
    type: "slide", // Set the slider type (slide or loop)
    perPage: 3, // Number of visible slides at a time
    perMove: 1, // Number of slides moved per interaction
    gap: "1rem", // Space between slides
    pagination: false, // Show pagination
  };
  const options = {
    rewind: true,
    type: "loop",
    perPage: 4,
    perMove: 1,
    focus: "center",
    // drag: "free",
    arrows: false, //
    // width: 800,
    gap: "1.5rem",
    mediaQuery: true,
    breakpoints: {
      1024: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row mx-0  mt-5">
          <div>
            <h3 className=" fw-bold text-lg-start text-center">
              Our <span className="text-blue">Blog</span>
            </h3>
            <p className="text-capitalize text-faded fs-7 text-lg-start text-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />{" "}
              Mollitia nihil deserunt officia? Nisi eius, aspernatur labore
              reiciendis iste animi.
            </p>
          </div>
          <div className="col-lg-3 col-12">
            <BlogCard />
          </div>
          <div className="col-lg-3 col-12">
            <BlogCard />
          </div>
          <div className="col-lg-3 col-12">
            <BlogCard />
          </div>
          <div className="col-lg-3 col-12">
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default OurBlog;
