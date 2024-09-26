import { Button } from "@mui/material";
import React from "react";

const BlogCard = () => {
  return (
    <>
      <div className="card" >
        <img src="https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="card-body">
         <Button size="small" variant="outlined" > Read </Button>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
